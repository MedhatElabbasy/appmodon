import { Injectable } from '@angular/core';
import {
  Router,
  Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot,
} from '@angular/router';
import { Observable, of } from 'rxjs';
import { Client } from '../../models/clients';
import { ClientsService } from '../../services/clients.service';

@Injectable({
  providedIn: 'root',
})
export class ClientDetailsResolver implements Resolve<Client> {
  constructor(private client: ClientsService) {}
  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<Client> {
    return this.client.getClientDetailsById(route.params['id']);
  }
}
