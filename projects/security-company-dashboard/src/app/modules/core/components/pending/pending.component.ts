import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LangService } from 'projects/tools/src/public-api';
import { AuthService } from '../../../auth/services/auth.service';
import { Routing } from '../../routes/app-routes';

@Component({
  selector: 'app-pending',
  templateUrl: './pending.component.html',
  styleUrls: ['./pending.component.scss'],
})
export class PendingComponent implements OnInit {
  constructor(
    public lang: LangService,
    private auth: AuthService,
    private router: Router
  ) {
    if (!this.auth.snapshot.userInfo?.isActive) {
      if (this.auth.snapshot.userInfo?.isRejected) {
        this.router.navigate(['/' + Routing.rejected]);
      }

      if (this.auth.snapshot.userInfo?.isApproved) {
        this.router.navigate(['/' + Routing.approved]);
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
