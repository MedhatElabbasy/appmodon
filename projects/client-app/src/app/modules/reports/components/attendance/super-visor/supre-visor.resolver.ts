import { Injectable } from '@angular/core';
import {
  Router,
  Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot,
} from '@angular/router';
import { Observable, of } from 'rxjs';
import { ReportsService } from '../../../services/reports.service';

//import { Loader } from '../../../../core/enums/loader.enum';
import { Roles, convertDateToString } from 'projects/tools/src/public-api';
import { AuthService } from '../../../../auth/services/auth.service';

@Injectable({
  providedIn: 'root',
})
export class SupreVisorResolver implements Resolve<any[]> {
  constructor(private reports: ReportsService ,  private auth: AuthService) {}
  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<any[]> {
    let startDate = convertDateToString(new Date());
    let report:any
    let isMain = this.auth.snapshot.userIdentity?.roles.includes(
      Roles.Company
    );
    if(isMain){
      this.auth.userInfo.subscribe((res:any) => {
        if(res){

          this.reports
      .getAttendanceSuperVisorReport(res.id,startDate, startDate)
      .subscribe((res) => {
        console.log(res);
        report=res
      });
        }
      
    })
    }else{
      this.auth.userInfo.subscribe((res:any) => {
        if(res){
          console.log(res);
    
          if(!res.clientCompanyBranch.isMainBranch){

            this.reports.GetAllBetweenTwoDatesAndBranch(res.clientCompanyBranch.clientCompanyId ,startDate, startDate ,res.clientCompanyBranchId )
            .subscribe((res) => {
              console.log(res);
              report=res
            });
          }else if(res.clientCompanyBranch.isMainBranch){
            this.reports
            .getAttendanceSuperVisorReport(res.clientCompany.id,startDate, startDate)
            .subscribe((res) => {
              console.log(res);
              report=res
            });
          }
        }
      });
    }
  
    return report;
  
  }
}
