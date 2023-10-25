import { Injectable } from '@angular/core';
import {
  Router,
  Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot,
} from '@angular/router';
import { Observable, of } from 'rxjs';
import { ClientOrder, RequestsService } from 'projects/tools/src/public-api';
import { AuthService } from '../../../auth/services/auth.service';
import { CompanyOrdersService } from '../../services/company-orders.service';

@Injectable({
  providedIn: 'root',
})
export class ApprovedRequestsResolver implements Resolve<any> {
  constructor(
    private orderService: CompanyOrdersService,
    private auth: AuthService
  ) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<ClientOrder[]> {
    let id = this.auth.snapshot.userInfo?.securityCompanyBranch.id!;
    return this.orderService.getAllByBranchId(id);
  }
}
