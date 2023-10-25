import { Injectable } from '@angular/core';
import {
  Router,
  Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot,
} from '@angular/router';
import { combineLatest, map, Observable, of } from 'rxjs';
import { LookupService } from 'projects/tools/src/public-api';

@Injectable({
  providedIn: 'root',
})
export class OtherDetailsResolver implements Resolve<boolean> {
  constructor(private lookups: LookupService) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<any> {
    let service = this.lookups.getAvailableServices();
    let scale = this.lookups.getCompanyScale();
    return combineLatest([service, scale]).pipe(
      map((res) => ({ services: res[0], scale: res[1] }))
    );
  }
}
