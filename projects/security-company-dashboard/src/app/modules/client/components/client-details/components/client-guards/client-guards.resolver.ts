import { Injectable } from '@angular/core';
import {
  Router,
  Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot,
} from '@angular/router';
import { Observable, of } from 'rxjs';
import { ClientSite } from '../../../../models/client-site';
import { ClientSiteService } from '../../../../services/client-site.service';

@Injectable({
  providedIn: 'root',
})
export class ClientGuardsResolver implements Resolve<ClientSite[]> {
  constructor(private sites: ClientSiteService) {}
  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<ClientSite[]> {
    let clientId = route.parent?.params['id'];
    return this.sites.getAllByClientId(clientId);
  }
}
