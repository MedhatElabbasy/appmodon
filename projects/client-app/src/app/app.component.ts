import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ClientCompany, LangService, ModalService, Roles } from 'projects/tools/src/public-api';
import { AuthService } from './modules/auth/services/auth.service';
import { ErrorService } from 'projects/tools/src/lib/services/error.service';
import { ClientBranchUser } from './modules/client/models/client-branch-user';
import { Subscription } from 'rxjs';
import { Routing } from './modules/core/routes/app-routes';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
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
  companyModelID = 'Choose-company'
  companies: any
  chosenCompany: any


  constructor(
    private auth: AuthService,
    private _ErrorService: ErrorService,
    private modal: ModalService,
    private router: Router,
    public lang: LangService
  ) {
    this._ErrorService.error.subscribe((res) => {
      this.message = res;
      modal.open(this.modalId);
    });

    this.auth.autoLogin();
    this.lang.checkLang();
    this.userStateListener();
  }

  userStateListener() {
    this.state = this.auth.userInfo.subscribe((user) => {
      this.user = user;
      // console.log(this.user);
      // if (user) {
      //   let role = this.auth.snapshot.userIdentity?.role;
      //   if (role == Roles.Company) {
      //    this.chooseCompany(user);
      //   }       
      // }
    });
  }



  // chooseCompany(user:any){
  //   this.modal.open(this.companyModelID)
  //   this.auth.getAllSecurityCompaniesByClientId(user.id,1,50).subscribe((res:any)=>{
  //     console.log(res.data);
  //     this.companies=res.data;
  //   })
  // }
  // redirectToCompany(company:any){
  //  this.chosenCompany=company;
  //  this.auth.chosenCopmanyID.next(this.chosenCompany.securityCompany.id)
  //  //this.router.navigate([`/${Routing.companies}`]);
  // }



}