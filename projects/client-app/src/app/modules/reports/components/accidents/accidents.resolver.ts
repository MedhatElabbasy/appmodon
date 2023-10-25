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
import { Incident } from '../../models/incident';
import { ReportsService } from '../../services/reports.service';
import { AuthService } from '../../../auth/services/auth.service';

@Injectable({
  providedIn: 'root',
})
export class AccidentsResolver implements Resolve<Incident[]> {
  constructor(private reports: ReportsService , private auth: AuthService,) {}
  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
    
  ): Observable<Incident[]> {
    let startDate = convertDateToString(new Date());
    let clientId = this.auth.snapshot.userInfo?.id;
    let user = this.auth.snapshot.userIdentity;
  let report:any
    if (user?.roles.includes(Roles.Company)) {
   
      report= this.reports.getAllAccidentByClientCompany(clientId,
      startDate,
      startDate
    )
  
    }else{
      this.auth.userInfo.subscribe((res:any) => {
        if(res){
          if(!res.clientCompanyBranch.isMainBranch){

            report= this.reports.GetAllByClientCompanyAndDateAndBranchId(startDate, startDate , res.clientCompanyBranchId)
          }else if(res.clientCompanyBranch.isMainBranch){

            report= this.reports.getAllAccidentByClientCompany(res.clientCompany.id,
              startDate,
              startDate
            )

          }
         
        }
      });
    }
    return report;
  }
}
