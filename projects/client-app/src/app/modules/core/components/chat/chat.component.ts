import { Router } from '@angular/router';
import { Component, ElementRef, OnInit, ViewChild, HostListener } from '@angular/core';
import { loadTranslations } from '@angular/localize';
import { HubConnection, HubConnectionBuilder } from '@microsoft/signalr';
import { environment } from 'projects/client-app/src/environments/environment';
import { ErrorService } from 'projects/tools/src/lib/services/error.service';
import { ClientCompany, LangService, ModalService, Roles } from 'projects/tools/src/public-api';
import { Subscription } from 'rxjs';
import { AuthService } from '../../../auth/services/auth.service';
import { ClientBranchUser } from '../../../client/models/client-branch-user';
import { agent, chat, clientCompanyChat } from '../../models/chat';
import { ChatService } from '../../services/chat.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit {
  private _hubConnection!: HubConnection;
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
  tempe: any;
  start: number = 1
  All: any[] = []
  sum = 10;
  total: number = 0;
  pageSize = 10;
  pageNumber = 1;
  direction = "";
  bodyDiv = true;
  temp: any;
  @ViewChild('chatListContainer') list?: ElementRef<HTMLDivElement>;
  @ViewChild('end') endOfChat?: ElementRef<HTMLDivElement>;
  @ViewChild('chatTextarea') searchElement?: ElementRef<HTMLDivElement>;
  @ViewChild('line') line?: ElementRef<HTMLDivElement>;
  chatInputMessage: string = "";
  agentName!: string;
  agentPhoto!: string;
  userInfo:any


  chatMessages: clientCompanyChat[] = [];
  newMessages: clientCompanyChat[] = [];



  constructor(
    private auth: AuthService,
    private _ErrorService: ErrorService,
    private modal: ModalService,
    public lang: LangService,
    public chat: ChatService,
    public router:Router
  ) {
    this.lang.checkLang();
    this.auth.chosenCopmanyID.subscribe((res) => {
    });

    auth.userInfo.subscribe((res) => {
      this.userInfo = res
      
    })
  }
  ngOnInit(): void {
    this.StateListener();
    // this.connect();


  }

  StateListener() {
    this.state = this.auth.userInfo.subscribe((user) => {
      if (!this.user) {
        this.user = user;

        if (user) {
          let role = this.auth.snapshot.userIdentity?.role;
          if (role == Roles.Company) {
            this.client = user as ClientCompany;
            this.id = this.client.id
            // console.log("companyfun");
            // this.chat.chatCompany(this.id, this.start, 1)
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
      this.tempe = response
      this.photos(this.start, this.sum);
    })
  }

  photos(index: number, sum: number) {
    for (let i = 0; i < sum; i++) {
      if (this.tempe[i] != null) {
        this.All[0] = (this.tempe[i]);
      }
    }
  }

  private async connect() {
    this._hubConnection = new HubConnectionBuilder()
      .withUrl(environment.chatHub)
      .build();

    await this._hubConnection
      .start()

    this._hubConnection.invoke('AddToGroup', `${this.agentID + this.auth.snapshot.userInfo?.id}-chat`);

    // messageReceived
    this._hubConnection.on('ReceiveMessage', (user, message) => {
      // console.log(user);

      console.log("hub")
      this.chat.clientCompany(this.id, this.agentID, this.start, 10).subscribe((res: any) => {
        console.log(res);
        
        if (res) {
          this.temp = res.data;
          this.newMessages = res.data
          console.log(res.data[0]);
          if (res.data[0].isFromAgent) {
            this.pushNewMessage()

            setTimeout(() => {
              console.log();
              this.scrollTo(this.endOfChat?.nativeElement)
            }, 0);
          }


        }
      })
      // this.loadMessages()
    });


    // .catch((err) =>
    //   console.log('error while establishing signalr connection: ' + err)
    // );
  }

  openChat(selectedAgent: chat) {
    this.agentID = selectedAgent.agent.id
    this.bodyDiv = false;
    this.agentName = selectedAgent.agent.firstName;
    this.agentPhoto = selectedAgent.agent.photo.fullLink;
    this.loadMessages();
    setTimeout(() => {
      this.searchElement?.nativeElement.focus();

    }, 0);

    this.connect()

  }

  loadMessages() {
    let x = this.chat.clientCompany(this.id, this.agentID, this.start, 10).subscribe((res: any) => {
      this.temp = res.data;
      console.log("Load");
      this.pushMessages(this.sum)
    })
  }

  pushNewMessage() {
    this.chatMessages.unshift(this.newMessages[0]);
    this.scrollTo(this.endOfChat?.nativeElement)
  }

  pushMessages(sum: number) {
    if (sum == 20) {
      // this.chatMessages = []
    }

    // if (this.chatMessages.length != sum) {
    for (let i = 0; i < sum; i++) {
      if (this.temp[i] != null) {
        this.chatMessages.push(this.temp[i]);
      }
    }
    // }

    setTimeout(() => {
      this.scrollTo(this.endOfChat?.nativeElement)
    }, 0)


    console.log(this.chatMessages);
  }

  onScroll(event: any) {
    if (event.target.scrollTop == 0) {
      console.log("Hi");
      this.sum += 10
      this.start = this.start + 1;
      this.loadMessages();
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

  //  ngAfterViewChecked() {
  //    this.scrollToBottom()
  //  }

  send() {
    //  this.chatMessages.push({
    //    message: this.chatInputMessage,
    //    user: this.human
    //  });

    let message = (<HTMLInputElement>document.getElementById("chat-textarea")).value
    let model = {
      "agentId": this.agentID,
      "clientCompanyId": this.id,
      "message": message,
      "isFromAgent": false
    }

    console.log(this.chatMessages);


    this.chat.addAgentClientChat(model).subscribe((res) => {
      this.companyChat()


      let x = this.chat.clientCompany(this.id, this.agentID, 1, 10).subscribe((res: any) => {
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
}


