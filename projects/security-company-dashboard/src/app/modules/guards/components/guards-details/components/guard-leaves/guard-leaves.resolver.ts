import { Injectable } from '@angular/core';
import {
  Router,
  Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot,
} from '@angular/router';
import { CompanySecurityGuard } from 'projects/security-company-dashboard/src/app/modules/client/models/site-details';
import { Observable, of } from 'rxjs';
import { CryptoService } from 'projects/tools/src/public-api';
import { GuardLeaves } from '../../../../models/guard-leaves';
import { CompanyGuardsService } from '../../../../services/company-guards.service';

@Injectable({
  providedIn: 'root',
})
export class GuardLeavesResolver implements Resolve<GuardLeaves[]> {
  constructor(
    private guardServices: CompanyGuardsService,
    private crypto: CryptoService
  ) {}
  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<GuardLeaves[]> {
    let encryptedGuard = route.parent?.params['guard'];
    let guard: CompanySecurityGuard = JSON.parse(
      this.crypto.decrypt(encryptedGuard)
    );
    return this.guardServices.getLeavesByCompanyGuardId(guard.id);
  }
}
