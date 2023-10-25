import { OrderService } from './../../../core/services/order.service';
import { Injectable } from '@angular/core';
import {
  Router,
  Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot,
} from '@angular/router';
import { Observable, of } from 'rxjs';
import { AuthService } from '../../../auth/services/auth.service';
import { ClientCompany, Roles } from 'projects/tools/src/public-api';
import { ClientBranchUser } from '../../models/client-branch-user';
import { ClientOrder } from '../../models/client-order';

@Injectable({
  providedIn: 'root',
})
export class BranchOrdersResolver implements Resolve<ClientOrder[]> {
  constructor(private orderService: OrderService, private auth: AuthService) {}
  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<ClientOrder[]> {
    let orders;
    orders = this.orderService.getAllApprovedByBranchId(
      (this.auth.snapshot.userInfo as ClientBranchUser).clientCompanyBranchId
    );

    return orders;
  }
}
