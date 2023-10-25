import { Injectable } from '@angular/core';
import {
  Router, Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import { Observable, of } from 'rxjs';
import { ReportsService } from '../../../services/reports.service';
import { AuthService } from '../../../../auth/services/auth.service';
import { Roles, convertDateToString } from 'projects/tools/src/public-api';

@Injectable({
  providedIn: 'root'
})
export class GuardResolver implements Resolve<any[]>{
  constructor(private reports: ReportsService, private auth: AuthService) { }
  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<any[]> {
    let startDate = convertDateToString(new Date());
    let report: any
    let isMain = this.auth.snapshot.userIdentity?.roles.includes(
      Roles.Company
    );
    if (isMain) {
      this.auth.userInfo.subscribe((res: any) => {
        if (res) {
          this.reports
            .getAttendanceReport(startDate, res.id, startDate)
            .subscribe((res) => {
              console.log(res);
              report = res
              return report;

            });
        }
      });
    } else {
      this.auth.userInfo.subscribe((res: any) => {
        if (res) {
          console.log(res);

          if (!res.clientCompanyBranch.isMainBranch) {
            // this.reports.getSecurityCompanyBranchIdByClientCompanyBranchId(res.clientCompanyBranch.id).subscribe((res2) => {
              //securityCompanyBranchIdsecurityCompanyBranchId
              this.reports.GetAllByClientIdAndDateAndBranchId(res.clientCompanyBranch.clientCompanyId, startDate, startDate, res.clientCompanyBranch.id)
                .subscribe((res) => {
                  console.log(res);
                  report = res
                  return report;

                });

            // })

            // this.reports.getSecurityCompanyBranchIdByClientCompanyBranchId(res.clientCompanyBranch.id).subscribe((res2) => {
            //   this.reports.GetAllByClientIdAndDateAndBranchId(res.clientCompanyBranch.clientCompanyId, startDate, startDate, res2.securityCompanyBranchId).subscribe((res) => {
            //     report = res;
            //     console.log(res);
            //   })
            // })



          } else if (res.clientCompanyBranch.isMainBranch) {
            this.reports
              .getAttendanceReport(startDate, res.clientCompanyId, startDate)
              .subscribe((res) => {
                console.log(res);
                report = res
                return report;

              });
          }
        }
      })
    }

    console.log(report);

    return report;

  }
}
