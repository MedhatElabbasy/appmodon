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
import { Loader } from '../../../core/enums/loader.enum';
import { VisitorsReport } from '../../models/visitors-report';
import { ReportsService } from '../../services/reports.service';

@Injectable({
  providedIn: 'root',
})
export class VisitorsReportsResolver implements Resolve<VisitorsReport[]> {
  constructor(private reports: ReportsService, private auth: AuthService) {}
  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<VisitorsReport[]> {
    let isMain = this.auth.snapshot.userIdentity?.roles.includes(
      Roles.VirtualAdmin
    );
    let date = convertDateToString(new Date());
    let report$;
    if (isMain) {
      report$ = this.reports.attendanceReportForCompany(date, Loader.yes);
    } else {
      report$ = this.reports.attendanceReportForBranch(date, Loader.yes);
    }

    return report$;
  }
}
