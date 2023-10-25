import { Injectable } from '@angular/core';
import {
  Router,
  Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot,
} from '@angular/router';
import { Observable, of } from 'rxjs';
import { ClientCompany, Roles } from 'projects/tools/src/public-api';
import { AuthService } from '../../../auth/services/auth.service';
import { OrderService } from '../../../core/services/order.service';
import { ClientBranchUser } from '../../models/client-branch-user';
import { ClientOrder } from '../../models/client-order';

@Injectable({
  providedIn: 'root',
})
export class WaitingOrdersResolver implements Resolve<ClientOrder[]> {
  constructor(private orderService: OrderService, private auth: AuthService) {}
  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<ClientOrder[]> {
    let orders;

    if (
      this.auth.snapshot.userIdentity?.roles.includes(Roles.VirtualClientAdmin)
    ) {
      if (this.auth.snapshot.userIdentity?.role == Roles.Company) {
        orders = this.orderService.getAllWaitingApprovedByClientId(
          (this.auth.snapshot.userInfo as ClientCompany).id
        );

      } else {
        let all: any = this.auth.snapshot.userInfo;
        orders = this.orderService.getAllWaitingApprovedByClientId(
          all.clientCompanyBranch.clientCompanyId
        );

      }
    } else {
      orders = this.orderService.getAllApprovedByBranchId(
        (this.auth.snapshot.userInfo as ClientBranchUser).clientCompanyBranchId
      );

    }

    return orders;
  }
}
