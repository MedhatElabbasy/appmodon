import { Component, HostListener, OnChanges, OnDestroy, OnInit, SimpleChanges } from '@angular/core';
import { Subscription } from 'rxjs';
import {
  ClientCompany,
  LangService,
  language,
  Roles,
} from 'projects/tools/src/public-api';

import { SecurityGuard } from '../../../auth/models/security-guard.model';
import { AuthService } from '../../../auth/services/auth.service';
import { ClientBranchUser } from '../../../client/models/client-branch-user';

import { Routing } from '../../routes/app-routes';
import { notify } from '../../models/notification';
import { NotificationService } from '../../services/notifications.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit, OnDestroy {
  url = window.location
  numberOfSuperVisors!: number
  sum = 10;
  throttle = 1000;
  scrollDistance = 1;
  scrollUpDistance = 100;
  direction = "";
  modalOpen = false;
  temp!: notify[]
  start: number = 1
  AllNotify: any[] = []
  total: number = 0
  date: any
  img: any

  isScrolled!: boolean;
  display: boolean = false;
  links = {
    login: `/${Routing.auth.module}/${Routing.auth.children.login}`,
    register: `/${Routing.auth.module}/${Routing.auth.children.accountType}`,
    main: `/${Routing.home}`,
    underConstriction: `${Routing.underConstruction}`,
    companies: `/${Routing.companies}`,
    clientCompanies: `/${Routing.clientCompanies}`,
    guardProfile: `/${Routing.profile.module}/${Routing.profile.children.guardProfile}`,
    clientProfile: `/${Routing.profile.module}/${Routing.profile.children.clientProfile}`,
    lookups: `/${Routing.MonitoringComplaints}`,
    jobs: `/${Routing.jobs}`,
    waitingOrders: `/${Routing.client.module}/${Routing.client.children.manageOrders}`,
    branchOrders: `/${Routing.client.module}/${Routing.client.children.ClientBranches}`,
    dashboard: `/${Routing.dashboad.module}/${Routing.dashboad.children.dashboad}`,
    complete: `${Routing.completeProfile.module}/${Routing.completeProfile.children.completeProfile}`,
    reports: `/${Routing.reports.module}/${Routing.reports.children.allReports}`,
    locations: `/${Routing.location.module}/${Routing.location.children.location}`,
    //clientGuard:`/${Routing.clientGuard.module}/${Routing.clientGuard.children.clientGurad}`
    clientGuard: `/${Routing.clientGuard.module}/${Routing.location.children.location}`,
  };
  myLinks = Object.values(this.links);
  year = new Date().getFullYear();
  isLoggedIn!: boolean;
  langs = language;
  guard!: SecurityGuard;
  client!: ClientCompany;
  clientUser!: ClientBranchUser;
  state!: Subscription;
  user: any;
  id: any;
  mainBranch!: boolean;
  constructor(private auth: AuthService, public router: Router, public lang: LangService, public _notify: NotificationService) { }

  ngOnInit(): void {
    this.userStateListener();
    //console.log(this.myLinks);

  }

  @HostListener('window:scroll', [])
  onWindowScroll() {
    const number =
      window.pageYOffset ||
      document.documentElement.scrollTop ||
      document.body.scrollTop ||
      0;

    number > 71 ? (this.isScrolled = true) : (this.isScrolled = false);
  }

  onLanguageChangeListener() {
    this.lang.toggleLanguage();
  }

  userStateListener() {
    this.state = this.auth.userInfo.subscribe((user) => {
      console.log("Alooooooo");

      if (!this.user) {
        this.isLoggedIn = !!user;
        console.log("Alooooooo");

        this.user = user;
        //console.log(this.user);

        
      }
      if (user) {
        this.user = user;
        let role = this.auth.snapshot.userIdentity?.role;
        if (role == Roles.Company) {
          this.client = user as ClientCompany;
          this.id = this.client.id
          this.clientNotify();
        }

          if (role == Roles.SecurityGurd) {
            this.guard = user as SecurityGuard;
            //this.guardNotify()
          }

        if (role == Roles.ClientCompanyUser) {
          this.clientUser = user as ClientBranchUser;
          if (!user.clientCompanyBranch.isMainBranch) {
            this.mainBranch = true
          } else if (user.clientCompanyBranch.isMainBranch) {
            this.mainBranch = false;
          }
          this.id = this.clientUser.clientCompanyBranch.clientCompanyId;
          this.clientNotify();
        }
      }
    });
  }

  logout() {
    this.auth.logout();
  }

  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.

    // this.state.unsubscribe();
  }

  clientNotify() {
    //console.log(this.id);

    this._notify.clientNotification(this.id, this.start, 10).subscribe((response: any) => {
      if (response) {
        this.hideloader();
      }
      this.temp = response.data //1
      this.total = response.totalCount
      //console.log(this.temp);
      this.addphotos(this.start, this.sum);  // 2
    }, (error) => {

    })
  }

  // guardNotify(){
  //   this._notify.guardNotification(this.guard.id,this.start ,10).subscribe((response: any) => {   
  //     if (response) {
  //       this.hideloader();
  //   }
  //     this.temp = response.data //1
  //     this.total=response.totalCount
  //     console.log(this.temp);
  //     this.addphotos(this.start, this.sum);  // 2
  //   }, (error) => {  

  //   })  
  // }


  addphotos(index: number, sum: number) {


    for (let i = 0; i < sum; i++) {
      if (this.temp[i] != null) {
        //   let daty= this.temp[i].created.split(" ")[0];
        // const [day, month, year] = daty.split("-");
        // this.date = new Date(+year, +month - 1, +day);
        // console.log(this.temp[i].created.split(" ")[1].split(":")[2]);

        this.AllNotify.push(this.temp[i]);
      }
    }

  }

  onScrollDown() {
    //console.log("scrolldown");
    this.start = this.start + 1;
    //console.log(this.start,this.sum);
    this.clientNotify()
    this.direction = "down";
  }

  hideloader() {
    document.getElementById('loading')!
      .style.display = 'none';
  }

}
