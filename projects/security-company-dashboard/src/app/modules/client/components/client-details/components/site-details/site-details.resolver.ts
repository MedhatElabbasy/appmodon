import { Injectable } from '@angular/core';
import {
  Router,
  Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot,
} from '@angular/router';
import { AuthService } from 'projects/security-company-dashboard/src/app/modules/auth/services/auth.service';
import { GuardsService } from 'projects/security-company-dashboard/src/app/modules/core/services/guards.service';
import { SchedulesService } from 'projects/security-company-dashboard/src/app/modules/schedules/services/schedules.service';
import { combineLatest, map, Observable, of } from 'rxjs';
import { Roles } from 'projects/tools/src/public-api';
import { ClientSite } from '../../../../models/client-site';
import { ClientSiteService } from '../../../../services/client-site.service';

@Injectable({
  providedIn: 'root',
})
export class SiteDetailsResolver implements Resolve<any> {
  constructor(
    private siteService: ClientSiteService,
    private schedules: SchedulesService,
    private guards: GuardsService,
    private auth: AuthService
  ) {}
  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<any> {
    let isAdmin = this.auth.snapshot.userIdentity?.roles.includes(
      Roles.VirtualAdmin
    );
    let shifts$ = this.schedules.getAllShifts(route.parent?.params['id']);
    let site$ = this.siteService.getSiteById(route.params['siteId']);
    let supervisors$;

    if (isAdmin) {
      supervisors$ = this.guards.getAllAvailableSupervisorsByCompany();
    } else {
      supervisors$ = this.guards.getAllAvailableSupervisorsByBranch();
    }

    return combineLatest([shifts$, site$, supervisors$]).pipe(
      map((res) => {
        return {
          shifts: res[0],
          site: res[1],
          supervisors: res[2],
        };
      })
    );
  }
}
