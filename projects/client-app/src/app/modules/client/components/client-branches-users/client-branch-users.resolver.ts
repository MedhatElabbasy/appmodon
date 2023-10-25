import { Injectable } from '@angular/core';
import {
  Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot,
} from '@angular/router';
import { Observable, of, combineLatest, map } from 'rxjs';
import { CountryCode, LookupService } from 'projects/tools/src/public-api';
import { ClientBranch } from '../../models/client-branch';
import { ClientBranchUser } from '../../models/client-branch-user';
import { ClientBranchUsersService } from '../../services/client-branch-users.service';
import { ClientBranchesService } from '../../services/client-branches.service';

interface Data {
  codes: CountryCode[];
  branch: ClientBranch;
  users: ClientBranchUser[];
}

@Injectable({
  providedIn: 'root',
})
export class ClientBranchUsersResolver implements Resolve<Data> {
  constructor(
    private toolsServices: LookupService,
    private branchServices: ClientBranchesService,
    private usersServices: ClientBranchUsersService
  ) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<Data> {
    let codes$ = this.toolsServices.getCountriesCodes();
    let branch$ = this.branchServices.getBranchById(route.params['id']);
    let users$ = this.usersServices.getAllUsersByBranchId(route.params['id']);

    return combineLatest([codes$, branch$, users$]).pipe(
      map((res) => ({ codes: res[0], branch: res[1], users: res[2] }))
    );
  }
}
