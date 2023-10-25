import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'projects/security-company-dashboard/src/environments/environment';
import { map, Observable, observable } from 'rxjs';
import { AuthService } from '../../auth/services/auth.service';
import { Loader } from '../../core/enums/loader.enum';
import { AttendanceReport } from '../models/attendance-report';
import { Incident } from '../models/incident';
import { VisitorsReport } from '../models/visitors-report';

@Injectable({
  providedIn: 'root',
})
export class ReportsService {
  private readonly url = environment.api;

  constructor(private http: HttpClient, private auth: AuthService) {}

  attendanceReportForCompany(date: string, loader: Loader) {
    let companyId = this.auth.snapshot.userInfo?.id;
    return this.http.get<VisitorsReport[]>(
      this.url + `api/Visitor/GetAllByCompanyId?Id=${companyId}&date=${date}`,
      {
        headers: {
          loader: loader,
        },
      }
    );
  }

  attendanceReportForBranch(date: string, loader: Loader) {
    let branchId = this.auth.snapshot.userInfo?.securityCompanyBranch.id;
    return this.http.get<VisitorsReport[]>(
      this.url + `api/Visitor/GetAllByBranshId?Id=${branchId}&date=${date}`,
      {
        headers: {
          loader: loader,
        },
      }
    );
  }

  getAllAccidentByCompany(startDate: string, endDate: string, loader: Loader) {
    let companyId = this.auth.snapshot.userInfo?.id;
    return this.http
      .get<Incident[]>(
        this.url +
          `api/Incident/GetAllByCompanyIdAndDate?CompanyId=${companyId}&SatrtDate=${startDate}&EndDate=${endDate}`,
        {
          headers: {
            loader: loader,
          },
        }
      )
      .pipe(
        map((res) => {
          res = res.map((e) => {
            e.gallery = e.incidentAttachments.map((a) => a.attachment.fullLink);
            return e;
          });

          return res;
        })
      );
  }

  getAttendanceReport(startDate: string, endDate: string, loader: Loader) {
    let companyId = this.auth.snapshot.userInfo?.id;
    return this.http.get<AttendanceReport[]>(
      this.url +
        `api/Attendance/GetAllByCompanyAndDate?CompanyId=${companyId}&StartDate=${startDate}&EndDate=${endDate}`,
      {
        headers: {
          loader: loader,
        },
      }
    );
  }

  getAttendanceReportByClient(
    startDate: string,
    endDate: string,
    ClientId: number,
    loader: Loader
  ) {
    let companyId = this.auth.snapshot.userInfo?.id;
    return this.http.get<AttendanceReport[]>(
      this.url +
        `api/Attendance/GetAllByCompanyAndClient;lkjh;ljkIdAndDate?CompanyId=${companyId}&StartDate=${startDate}&EndDate=${endDate}&ClientId=${ClientId}`,
      {
        headers: {
          loader: loader,
        },
      }
    );
  }
}
