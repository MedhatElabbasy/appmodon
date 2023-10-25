import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LangService } from 'projects/tools/src/public-api';
import { AuthService } from '../../../auth/services/auth.service';
import { Routing } from '../../routes/app-routes';

@Component({
  selector: 'app-rejected',
  templateUrl: './rejected.component.html',
  styleUrls: ['./rejected.component.scss'],
})
export class RejectedComponent implements OnInit {
  id!: number | undefined;
  reason!: any;
  constructor(
    public lang: LangService,
    private auth: AuthService,
    private router: Router
  ) {
    this.id = this.auth.snapshot.userInfo?.id;
    this.reject(this.id);
    if (!this.auth.snapshot.userInfo?.isActive) {
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
  reject(id: number | undefined) {
    if (id) {
      this.auth.rejectedCompany(id).subscribe((res) => {
        this.reason = res;
      });
    }
  }
}
