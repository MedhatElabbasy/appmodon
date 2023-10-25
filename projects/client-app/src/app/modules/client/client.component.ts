import { Component, OnInit } from '@angular/core';
//import { ClientSidebar } from './routes/client-routes.enum';
import { Roles } from 'projects/tools/src/public-api';
import { AuthService } from 'projects/client-app/src/app/modules/auth/services/auth.service';
@Component({
  selector: 'app-client',
  templateUrl: './client.component.html',
  styleUrls: ['./client.component.scss'],
})
export class ClientComponent implements OnInit {
  //sidebarList = [...ClientSidebar];
  main: boolean = false;
  branch: any;
  constructor(private auth: AuthService) {}

  ngOnInit(): void {
    let all: any = this.auth.snapshot.userInfo;
    this.branch = all.clientCompanyBranchId;
    if (all?.clientCompanyBranch?.isMainBranch) {
      this.main = true;
    }
  }
}
