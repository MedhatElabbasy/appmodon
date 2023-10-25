import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LangService, Roles } from 'projects/tools/src/public-api';
import { AuthService } from '../../../auth/services/auth.service';
import { Routing } from '../../routes/app-routes';

@Component({
  selector: 'app-not-active',
  templateUrl: './not-active.component.html',
  styleUrls: ['./not-active.component.scss'],
})
export class NotActiveComponent implements OnInit {
  constructor(
    public lang: LangService,
    private auth: AuthService,
    private router: Router
  ) {
    if (this.auth.snapshot.userIdentity?.role == Roles.SecurityCompanyUser) {
      if (
        this.auth.snapshot.userInfo?.appUser.isActive &&
        this.auth.snapshot.userInfo?.securityCompanyBranch.stauts
      ) {
        this.router.navigate(['/']);
      }
    } else {
      this.router.navigate(['/']);
    }
  }

  ngOnInit(): void {}

  logout() {
    this.auth.logout();
  }
}
