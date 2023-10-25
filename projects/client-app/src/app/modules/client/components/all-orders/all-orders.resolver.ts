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
import { OrderService } from '../../../core/services/order.service';

@Injectable({
  providedIn: 'root',
})
export class AllOrdersResolver implements Resolve<any> {
  constructor(private auth: AuthService, private orderServices: OrderService) {}
  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<any[]> {
    let user = this.auth.snapshot.userIdentity;
    let orders!:any
    if (user?.roles.includes(Roles.Company)) {
      orders = this.orderServices.getAllOrdersByClientId(
        (this.auth.snapshot.userInfo as ClientCompany).id 
      )
    } else {
      // orders = this.orderServices.getAllOrdersByClientId(
      //   (this.auth.snapshot.userInfo as ClientBranchUser).clientCompanyBranch.clientCompanyId
      // );
      this.auth.userInfo.subscribe((res) => {
        if(res){
          //console.log(res);
    
          if(!res.clientCompanyBranch.isMainBranch){
           orders = this.orderServices.getAllByBranchId( (this.auth.snapshot.userInfo as ClientCompany).clientCompanyBranchId )
          }
          else {
            orders = this.orderServices.getAllOrdersByClientId(
              (this.auth.snapshot.userInfo as ClientCompany).clientCompanyBranch.clientCompanyId
            )
          }
        }
      });
    }

    return orders;
  }
}
