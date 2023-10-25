import { Directionality } from '@angular/cdk/bidi';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import {
  LangService,
  language,
  Roles,
  SecurityCompany,
} from 'projects/tools/src/public-api';
import { ACCOUNT_LIST } from '../../../account-management/routes/account-routes.enum';
import { AuthService } from '../../../auth/services/auth.service';
import { SIDEBAR_LIST } from '../../data/sidebar-menu';
import { MenuItem } from '../../models/menu-item';
import { Routing } from '../../routes/app-routes';

@Component({
  selector: 'app-dashboard-layout',
  templateUrl: './dashboard-layout.component.html',
  styleUrls: ['./dashboard-layout.component.scss'],
})
export class DashboardLayoutComponent implements OnInit {
  menu: MenuItem[] = [...SIDEBAR_LIST];
  accountList: { name: string; link: string; icon: string }[] = [
    ...ACCOUNT_LIST,
  ];
  userInfo!: SecurityCompany;
  routing = Routing;
  isOpen: boolean = false;
  /** Whether the widget is in RTL mode or not. */
  private isRtl!: boolean;

  /** Subscription to the Directionality change EventEmitter. */
  private _dirChangeSubscription = Subscription.EMPTY;

  constructor(
    public lang: LangService,
    private auth: AuthService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.getInitData();
  }

  ngOnInit(): void {}

  getInitData() {
    this.userInfo = this.route.snapshot.data['company'];

    if (this.userInfo) {
      if (!this.userInfo.isActive) {
        if (this.userInfo?.isRejected) {
          this.router.navigate(['/' + Routing.rejected]);
        } else if (this.userInfo.isApproved) {
          this.router.navigate(['/' + Routing.approved]);
        } else {
          this.router.navigate(['/' + Routing.pending]);
        }
      }
    }

    if (this.auth.snapshot.userIdentity?.role == Roles.SecurityCompanyUser) {
      if (
        !this.userInfo.appUser.isActive ||
        !this.userInfo.securityCompanyBranch.stauts
      ) {
        this.router.navigate(['/' + Routing.notActive]);
      }
    }
  }

  onLanguageChange() {
   this.lang.toggleLanguage()
  }

  logout() {
    this.auth.logout();
  }

  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    this._dirChangeSubscription.unsubscribe();
  }
}
