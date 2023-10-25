import { Injectable } from '@angular/core';
import {
  Router,
  Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot,
} from '@angular/router';
import { combineLatest, map, Observable } from 'rxjs';
import { OptionSetEnum, OptionSetService, Roles } from 'projects/tools/src/public-api';
import { AuthService } from '../../../auth/services/auth.service';
import { ClientsService } from '../../../client/services/clients.service';
import { ShiftsService } from '../../../settings/services/shifts.service';

@Injectable({
  providedIn: 'root',
})
export class CompanyShiftsResolver implements Resolve<any> {
  constructor(
    private clients: ClientsService,
    private auth: AuthService,
    private shifts: ShiftsService,
    private optionsSets: OptionSetService
  ) {}
  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<any> {
    const isAdmin = this.auth.snapshot.userIdentity?.roles.includes(
      Roles.VirtualAdmin
    );
    let clients$;

    if (isAdmin) {
      clients$ = this.clients.getClientsBySecurityCompany(1, 100000);
    } else {
      clients$ = this.clients.getClientsByBranchId(1, 100000);
    }

    let shifts$ = this.shifts.getAll(1, 100000);
    let breakTypes$ = this.optionsSets.getOptionSetByName(
      OptionSetEnum.breakType
    );

    return combineLatest([clients$, shifts$, breakTypes$]).pipe(
      map((res) => ({ clients: res[0], shifts: res[1], breakTypes: res[2] }))
    );
  }
}
