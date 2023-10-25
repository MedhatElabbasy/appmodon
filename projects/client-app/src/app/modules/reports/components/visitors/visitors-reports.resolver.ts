import { Injectable } from '@angular/core';
import {
  Router,
  Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot,
} from '@angular/router';
import { Observable, of } from 'rxjs';
import { convertDateToString, Roles } from 'projects/tools/src/public-api';
import { AuthService } from '../../../auth/services/auth.service';
//import { Loader } from '../../../core/enums/loader.enum';
import { VisitorsReport } from '../../models/visitors-report';
import { ReportsService } from '../../services/reports.service';

@Injectable({
  providedIn: 'root',
})
export class VisitorsReportsResolver  {
  constructor(private reports: ReportsService, private auth: AuthService) {}
  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<VisitorsReport[]>|any {
    let isMain = this.auth.snapshot.userIdentity?.roles.includes(
      Roles.Company
    );
     let date = convertDateToString(new Date());
     let report$;
     if (isMain) {
      this.auth.userInfo.subscribe((res:any) => {
        if(res){
      report$ = this.reports.attendanceReportForClient(res.id,date);
        }
      });
    } else {
      this.auth.userInfo.subscribe((res:any) => {
       console.log(res);
       
      if(!res.clientCompanyBranch.isMainBranch){
        report$ = this.reports.attendanceReportForBranch(date);
      }
      else if(res.clientCompanyBranch.isMainBranch){
        report$ = this.reports.attendanceReportForClient(res.clientCompany.id,date);
      }
        
      });
      
    }
    return report$;
   
  }
 }
