import { Injectable } from '@angular/core';
import {
  Router,
  Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot,
} from '@angular/router';
import { Observable, of } from 'rxjs';
import { Roles } from 'projects/tools/src/public-api';
import { AuthService } from '../../../auth/services/auth.service';
import { CompanySecurityGuard } from '../../../client/models/site-details';
import { CompanyGuardsService } from '../../services/company-guards.service';

@Injectable({
  providedIn: 'root',
})
export class SupervisorsListResolver
  implements Resolve<CompanySecurityGuard[]>
{
  constructor(
    private auth: AuthService,
    private companyGuards: CompanyGuardsService
  ) {}
  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<CompanySecurityGuard[]> {
    const isMain = this.auth.snapshot.userIdentity?.roles.includes(
      Roles.VirtualAdmin
    );
    let guards$;
    if (isMain) {
      guards$ = this.companyGuards.getAllSupervisorsOnCompany();
    } else {
      guards$ = this.companyGuards.getAllSupervisorsOnBranch();
    }
    return guards$;
  }
}
