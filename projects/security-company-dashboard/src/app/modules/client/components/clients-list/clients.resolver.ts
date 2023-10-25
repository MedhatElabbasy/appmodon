import { Injectable } from '@angular/core';
import {
  Router,
  Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot,
} from '@angular/router';
import { Observable, of } from 'rxjs';
import { Pagination, Roles } from 'projects/tools/src/public-api';
import { AuthService } from '../../../auth/services/auth.service';
import { Client } from '../../models/clients';
import { ClientsService } from '../../services/clients.service';

@Injectable({
  providedIn: 'root',
})
export class ClientsResolver implements Resolve<Pagination<Client>> {
  constructor(private clients: ClientsService, private auth: AuthService) {}
  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<Pagination<Client>> {
    const isAdmin = this.auth.snapshot.userIdentity?.roles.includes(
      Roles.VirtualAdmin
    );

    if (isAdmin) {
      return this.clients.getClientsBySecurityCompany(1, 10);
    } else {
      return this.clients.getClientsByBranchId(1, 10);
    }
  }
}
