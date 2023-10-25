import { Injectable } from '@angular/core';
import {
  Router, Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import { combineLatest, Observable, of,take,map } from 'rxjs';
import { LookupService } from 'projects/tools/src/public-api';

@Injectable({
  providedIn: 'root'
})
export class ClientResolver implements Resolve<any> {
  constructor(private lookups: LookupService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot):
  Observable<any> {
    let companyType = this.lookups.getCompanyType();
    let city = this.lookups.getCity();
    return combineLatest([companyType, city]).pipe(
      take(1),
      map((res) => {
        return {
          companyType: res[0],
          city: res[1],
        };
      })
    );
  }
}
