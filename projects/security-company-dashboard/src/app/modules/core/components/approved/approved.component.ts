import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LangService } from 'projects/tools/src/public-api';
import { AuthService } from '../../../auth/services/auth.service';
import { Routing } from '../../routes/app-routes';

@Component({
  selector: 'app-approved',
  templateUrl: './approved.component.html',
  styleUrls: ['./approved.component.scss'],
})
export class ApprovedComponent implements OnInit {
  constructor(
    public lang: LangService,
    private auth: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    let status = this.auth.snapshot.userInfo?.isActive;
    if (status) {
      this.router.navigate(['/']);
    }
  }

  logout() {
    this.auth.logout();
  }
}
