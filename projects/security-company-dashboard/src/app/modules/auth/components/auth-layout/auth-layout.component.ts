import { Routing } from 'projects/security-company-dashboard/src/app/modules/core/routes/app-routes';
import { Router } from '@angular/router';
import { AuthService } from 'projects/security-company-dashboard/src/app/modules/auth/services/auth.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-auth-layout',
  templateUrl: './auth-layout.component.html',
  styleUrls: ['./auth-layout.component.scss'],
})
export class AuthLayoutComponent implements OnInit {
  constructor(private auth: AuthService, private router: Router) {
    if (this.auth.snapshot.userIdentity) {
      let dash = `/${Routing.dashboard}`;
      this.router.navigate([dash]);
    }
  }

  ngOnInit() {}
}
