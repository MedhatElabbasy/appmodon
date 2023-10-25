import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'projects/client-app/src/environments/environment';
import { ClientCompany, Roles } from 'projects/tools/src/public-api';
import { AuthService } from '../../auth/services/auth.service';
import { ClientBranchUser } from '../../client/models/client-branch-user';
import { AttendanceReport } from '../models/attencereport';

@Injectable({
  providedIn: 'root'
})
export class AttendanceService {

  private readonly url = environment.api;
  user: any;
  id: any;
  client!: ClientCompany;
  clientUser!: ClientBranchUser;

  constructor(private http: HttpClient, private auth: AuthService) {
    this.userState();
  }

  userState() {
    this.auth.userInfo.subscribe((user) => {
      this.user = user

      if (user) {
        let role = this.auth.snapshot.userIdentity?.role;
        if (role == Roles.Company) {
          this.client = user as ClientCompany;
          this.id = this.client.id

        }

        if (role == Roles.ClientCompanyUser) {
          this.clientUser = user as ClientBranchUser;
          this.id = this.clientUser.clientCompanyBranch.clientCompanyId;

        }
      }
    })



  }
  getAttendanceReportByCompany(startDate: string, endDate: string, chosenCompanyID: string) {
    // console.error("getAttendanceReportByCompany");
    return this.http.get<AttendanceReport[]>(
      this.url +
      `api/Attendance/GetAllByCompanyAndClientIdAndDate?CompanyId=${chosenCompanyID}&StartDate=${startDate}&EndDate=${endDate}&clientId=${this.id}`,
    )
  }

  getAttendanceByClientAndDate(startDate: string, endDate: string) {
    return this.http.get<AttendanceReport[]>(
      this.url +
      `api/Attendance/GetAllByClientIdAndDate?clientId=${this.id}&StartDate=${startDate}&EndDate=${endDate}`,
    )
  }
}
