import { Injectable } from '@angular/core';
import {
  Router,
  Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot,
} from '@angular/router';
import { Observable, of } from 'rxjs';
import { convertDateToString } from 'projects/tools/src/public-api';
import { Loader } from '../../../core/enums/loader.enum';
import { AttendanceReport } from '../../models/attendance-report';
import { ReportsService } from '../../services/reports.service';

@Injectable({
  providedIn: 'root',
})
export class AttendanceResolver implements Resolve<AttendanceReport[]> {
  constructor(private reports: ReportsService) {}
  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<AttendanceReport[]> {
    let startDate = convertDateToString(new Date());
    return this.reports.getAttendanceReport(startDate, startDate, Loader.yes);
  }
}
