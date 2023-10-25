import { Injectable } from '@angular/core';
import {
  Router,
  Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot,
} from '@angular/router';
import { ClientSiteService } from 'projects/security-company-dashboard/src/app/modules/client/services/client-site.service';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LocationGuardsResolver implements Resolve<any> {
  constructor(private siteService: ClientSiteService) {}
  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<any> {
    return this.siteService.getAllGuardsOnLocationByLocationId(
      route.params['locationId']
    );
  }
}
