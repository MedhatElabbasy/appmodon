import { Injectable } from '@angular/core';
import {
  Router,
  Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot,
} from '@angular/router';
import { combineLatest, map, Observable, of } from 'rxjs';
import { ClientOrder, RequestsService } from 'projects/tools/src/public-api';
import { AuthService } from '../../../auth/services/auth.service';
import { BranchesService } from '../../../branches/services/branches.service';

@Injectable({
  providedIn: 'root',
})
export class NewRequestsResolver implements Resolve<any> {
  constructor(
    private branches: BranchesService,
    private requestsService: RequestsService,
    private auth: AuthService
  ) {}
  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<any> {
    let id = this.auth.snapshot.userInfo?.id;
    let branches$ = this.branches.getAllByCompanyId();
    let requests$ = this.requestsService.getAllBySecurityCompany(
      this.auth.snapshot.userInfo?.id!
    );

    return combineLatest(branches$, requests$).pipe(
      map((res) => ({ branches: res[0], orders: res[1] }))
    );
  }
}
