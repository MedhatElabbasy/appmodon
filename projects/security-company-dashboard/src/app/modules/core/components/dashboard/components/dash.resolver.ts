import { Injectable } from '@angular/core';
import {
  Router,
  Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot,
} from '@angular/router';
import { Observable, of } from 'rxjs';
import { convertDateToString } from 'projects/tools/src/public-api';
import { AttendanceReport } from '../../../../reports/models/attendance-report';
import { ReportsService } from '../../../../reports/services/reports.service';
import { Loader } from '../../../enums/loader.enum';

@Injectable({
  providedIn: 'root',
})
export class DashResolver implements Resolve<AttendanceReport[]> {
  constructor(private reports: ReportsService) {}
  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<AttendanceReport[]> {
    let startDate = convertDateToString(new Date());
    return this.reports.getAttendanceReport(startDate, startDate, Loader.yes);
  }
}
