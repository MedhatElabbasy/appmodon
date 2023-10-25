import { Injectable } from '@angular/core';
import {
  Router,
  Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot,
} from '@angular/router';
import { GuardsService } from 'projects/security-company-dashboard/src/app/modules/core/services/guards.service';
import { SchedulesService } from 'projects/security-company-dashboard/src/app/modules/schedules/services/schedules.service';
import { combineLatest, map, Observable, of } from 'rxjs';
import { ClientSiteService } from '../../../../services/client-site.service';

@Injectable({
  providedIn: 'root',
})
export class ClientSiteResolver implements Resolve<any> {
  constructor(
    private schedules: SchedulesService,
    private guards: GuardsService,
    private sites: ClientSiteService
  ) {}
  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<any> {
    let clientId = route.parent?.params['id'];
    let shifts$ = this.schedules.getAllShifts(clientId);
    let supervisors$ = this.guards.getAllAvailableSupervisorsByBranch();
    let sites$ = this.sites.getAllByClientId(clientId);

    return combineLatest([shifts$, supervisors$, sites$]).pipe(
      map((res) => ({ shifts: res[0], supervisors: res[1], sites: res[2] }))
    );
  }
}
