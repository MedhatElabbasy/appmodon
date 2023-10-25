import { Injectable } from '@angular/core';
import {
  Router,
  Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot,
} from '@angular/router';
import { Observable, of } from 'rxjs';
import { Roles, convertDateToString } from 'projects/tools/src/public-api';
//import { Loader } from '../../../core/enums/loader.enum';
import { AttendanceReport } from '../../models/attendance-report';
import { ReportsService } from '../../services/reports.service';
import { AuthService } from '../../../auth/services/auth.service';

@Injectable({
  providedIn: 'root',
})
export class AttendanceResolver  {
  constructor(private reports: ReportsService, private auth: AuthService) {}
//   resolve(
//     route: ActivatedRouteSnapshot,
//     state: RouterStateSnapshot
//   ): Observable<AttendanceReport[]> {
//     let startDate = convertDateToString(new Date());
//     let user = this.auth.snapshot.userIdentity;
//     let reports:any
//     if (user?.roles.includes(Roles.Company)) {
//     reports= this.reports.getAttendanceReport(startDate, startDate);
//   }else{
// this.reports.GetAllByClientIdAndDateAndBranchId(startDate, startDate,)
//   }
//   }
}
