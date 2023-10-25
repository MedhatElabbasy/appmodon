import { environment } from 'projects/client-app/src/environments/environment';
import { HubConnection, HubConnectionBuilder } from '@microsoft/signalr';
import { Subscription } from 'rxjs';
import { ClientBranchUser } from './../../modules/client/models/client-branch-user';
import { agent, chat, clientCompanyChat } from './../../modules/core/models/chat';
import { ChatService } from './../../modules/core/services/chat.service';
import { ModalService, LangService, ClientCompany, Roles } from 'projects/tools/src/public-api';
import { ErrorService } from 'projects/tools/src/lib/services/error.service';
import { AuthService } from 'projects/client-app/src/app/modules/auth/services/auth.service';
import { Component, ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'app-chat-page',
  templateUrl: './chat-page.component.html',
  styleUrls: ['./chat-page.component.scss']
})
export class ChatPageComponent {

  private _hubConnection!: HubConnection;
  private _hubConnection1!: HubConnection;
  agentID!: string
  direct = 'ltr';
  title = 'client-app';
  message: string = '';
  modalId = 'error';
  client!: ClientCompany;
  clientUser!: ClientBranchUser;
  state!: Subscription;
  user: any;
  id: any;
  throttle = 1000;
  scrollDistance = 1;
  scrollUpDistance = 100;
  allAgents: any;
  start: number = 1
  All: any[] = []
  sum = 10;
  total: number = 0;
  pageSize = 10;
  pageNumber = 1;
  direction = "";
  bodyDiv = true;
  // lastMessage: string = "";
  temp: any;
  @ViewChild('chatListContainer') list?: ElementRef<HTMLDivElement>;
  @ViewChild('end') endOfChat?: ElementRef<HTMLDivElement>;
  @ViewChild('chatTextarea') searchElement?: ElementRef<HTMLDivElement>;
  @ViewChild('line') line?: ElementRef<HTMLDivElement>;
  @ViewChild('agentImg') agentImg?: ElementRef<HTMLDivElement>;
  @ViewChild('agentImg1') agentImg1?: ElementRef<HTMLDivElement>;
  @ViewChild('messageImg') messageImg?: ElementRef<HTMLDivElement>;
  @ViewChild('messagesScrollView') messagesScrollView?: ElementRef<HTMLDivElement>;
  chatInputMessage: string = "";
  agentName!: string;
  agentPhoto!: string;

  chatMessages: any[] = [];
  newMessages: any[] = [];

  messagesSplits: any[] = [];
  selectedAgent: any;
  isFirstMessages: boolean = true
  selectedAgentId: string = ""
  messagesAreLoading: boolean = false;
  reachedToStartOfChat: boolean = false
  currentAgaintId: string = '';


  constructor(
    private auth: AuthService,
    private _ErrorService: ErrorService,
    private modal: ModalService,
    public lang: LangService,
    public chat: ChatService
  ) {
    this.lang.checkLang();
    this.auth.chosenCopmanyID.subscribe((res) => {
    });
  }

  ngOnInit(): void {
    this.StateListener();
    this.connectToAllAgents()
  }

  StateListener() {
    this.state = this.auth.userInfo.subscribe((user) => {
      if (!this.user) {
        this.user = user;
        if (user) {
          let role = this.auth.snapshot.userIdentity?.role;
          if (role == Roles.Company) {
            this.client = user as ClientCompany;
            this.id = this.client.id;
            this.companyChat();

          } else {
            this.clientUser = user as ClientBranchUser;
          }
        }
      }
    });
  }

  companyChat() {

    this.chat.chatCompany(this.id, this.start, 1).subscribe((response) => {
      this.allAgents = response;
      this.photos(this.start, this.sum);


    })


  }

  photos(index: number, sum: number) {
    for (let i = 0; i < sum; i++) {
      if (this.allAgents[i] != null) {
        this.All[0] = (this.allAgents[i]);
      }
    }

  }

  private async connect() {
    // console.log(this._hubConnection.state);

    // if (this._hubConnection?.state == 'Connected') {
    //   await this._hubConnection.stop()
    // }
    this._hubConnection = new HubConnectionBuilder()
      .withUrl(environment.chatHub)
      .build();

    await this._hubConnection
      .start()


    this._hubConnection.invoke('AddToGroup', `${this.agentID + this.auth.snapshot.userInfo?.id}-chat`);


    // messageReceived
    this._hubConnection.on('ReceiveMessage', (user, message) => {
      // console.log("Hi222");
      // console.log(user);
      // console.log(message);

      this.chat.clientCompany(this.id, this.agentID, 1, 10).subscribe((res: any) => {

        if (res) {
          this.temp = res.data;
          this.newMessages = res.data;

          if (res.data[0].isFromAgent || res.data[0].id != this.chatMessages[0].id) {
            this.pushNewMessage();
            // console.log("Hi111");

            setTimeout(() => {
              this.scrollTo(this.endOfChat?.nativeElement)
            }, 100);
          }
        }


        this.messagesScrollView?.nativeElement.scrollTo({
          top: 1000,
          left: 0,
          behavior: 'auto'
        })
        this.scrollTo(this.endOfChat?.nativeElement)


      })

      this.companyChat();

    });


    setTimeout(() => {
      this.scrollTo(this.endOfChat?.nativeElement)
    }, 0)
  }

  private async connectToAllAgents() {
    this._hubConnection = new HubConnectionBuilder()
      .withUrl(environment.chatHub)
      .build();

    await this._hubConnection
      .start()

    this._hubConnection.invoke('AddToGroup', `${this.user.id}-allChats`);

    // messageReceived
    this._hubConnection.on('ReceiveMessage', (user, message) => {

      console.log("000000");

      this.companyChat()
      console.log(this.allAgents);

      setTimeout(() => {
        // this.scrollTo(this.endOfChat?.nativeElement)
      }, 0)

    });

  }

  openChat(selectedAgent: chat) {

    if (selectedAgent.agent.id != this.currentAgaintId) {
      this.currentAgaintId = selectedAgent.agent.id;
      this.resetChatStatus()

      this.selectedAgent = selectedAgent;
      this.agentID = selectedAgent.agent.id
      // this.bodyDiv = false;
      this.agentName = selectedAgent.agent.firstName;
      this.agentPhoto = selectedAgent.agent.photo.fullLink;
      this.loadMessages();
      setTimeout(() => {
        this.searchElement?.nativeElement.focus();
      }, 0);

      this.connect()
      setTimeout(() => {
        this.scrollTo(this.endOfChat?.nativeElement)
      }, 100)
    }

  }

  loadMessages() {
    let x = this.chat.clientCompany(this.id, this.agentID, this.start, 10).subscribe((res: any) => {
      this.temp = res.data;
      this.pushMessages(this.sum)

      console.log(this.start);
      this.isFirstMessages = false
      this.messagesAreLoading = false;
    })
  }

  pushNewMessage() {
    if (this.newMessages[0].id != this.chatMessages[0].id) {
      this.chatMessages.unshift(this.newMessages[0]);
      console.log("pushNewMessage");

    }
    // this.chatMessages.push(...this.temp)
    // this.chatMessages.splice(0, 10)


  }

  pushMessages(sum: number) {
    console.log(this.chatMessages);

    this.chatMessages.push(...this.temp)



  }

  onScroll(event: any) {

    if (event.target.scrollTop == 0 && this.isFirstMessages == false && this.sum <= this.chatMessages.length) {
      this.messagesAreLoading = true;
      this.sum += 10
      this.start = this.start + 1;
      this.loadMessages();
      // const maxScroll = this.messagesScrollView?.nativeElement.scrollHeight;

      // console.log(maxScroll);

      this.messagesScrollView?.nativeElement.scrollTo({
        top: 1000,
        left: 0,
        behavior: 'auto'
      })
    }
  }

  scrollTo(el: any) {
    el.scrollIntoView();
  }

  closeChat() {
    this.bodyDiv = true
    this.chatMessages = [];
    this.start = 1;
  }

  send() {
    let message = (<HTMLInputElement>document.getElementById("chat-textarea")).value
    let model = {
      "agentId": this.agentID,
      "clientCompanyId": this.id,
      "message": message,
      "isFromAgent": false
    }

    this.chat.addAgentClientChat(model).subscribe((res) => {
      this.companyChat()
      this.chat.clientCompany(this.id, this.agentID, 1, 10).subscribe((res: any) => {
        this.temp = res.data;
        // this.chatMessages = []
        this.newMessages = res.data;

        this.pushNewMessage()
        setTimeout(() => {
          this.scrollTo(this.endOfChat?.nativeElement)
        }, 0);
      })

    })

    this._hubConnection.invoke('SendMessageToGroup',
      `${this.agentID + this.auth.snapshot.userInfo?.id}-chat`, '', '').catch(err => console.error(err));

    this.chatInputMessage = ""
    setTimeout(() => {
      this.searchElement?.nativeElement.focus();
    }, 0);

  }

  scrollToBottom() {
    const maxScroll = this.list?.nativeElement.scrollHeight;
    this.list?.nativeElement.scrollTo({ top: maxScroll, behavior: 'smooth' });
  }

  selectAgent(agent: any) {
    this.selectedAgentId = agent.agent.id
  }

  resetChatStatus() {
    this.isFirstMessages = true
    this.chatMessages = []
    this.start = 1;
    this.sum = 10
  }


  converTime() {

  }

}
