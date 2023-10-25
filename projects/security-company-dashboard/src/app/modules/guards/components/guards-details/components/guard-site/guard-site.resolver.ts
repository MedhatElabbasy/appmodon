import { Injectable } from '@angular/core';
import {
  Router,
  Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot,
} from '@angular/router';
import {
  CompanySecurityGuard,
  SiteLocation,
} from 'projects/security-company-dashboard/src/app/modules/client/models/site-details';
import { Observable, of } from 'rxjs';
import { CryptoService } from 'projects/tools/src/public-api';
import { CompanyGuardsService } from '../../../../services/company-guards.service';

@Injectable({
  providedIn: 'root',
})
export class GuardSiteResolver implements Resolve<SiteLocation[]> {
  constructor(
    private crypto: CryptoService,
    private guardServices: CompanyGuardsService
  ) {}
  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<SiteLocation[]> {
    let encryptedGuard = route.parent?.params['guard'];
    let guard: CompanySecurityGuard = JSON.parse(
      this.crypto.decrypt(encryptedGuard)
    );

    return this.guardServices.getGuardSites(guard.id);
  }
}
