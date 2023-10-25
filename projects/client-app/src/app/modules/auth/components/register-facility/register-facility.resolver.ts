import { Injectable } from '@angular/core';
import {
  Router,
  Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot,
} from '@angular/router';
import { combineLatest, map, Observable, of, take } from 'rxjs';
import { LookupService } from 'projects/tools/src/public-api';

@Injectable({
  providedIn: 'root',
})
export class RegisterFacilityResolver implements Resolve<any> {
  constructor(private lookups: LookupService) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<any> {
    let companyType = this.lookups.getCompanyType();
    let countryCode = this.lookups.getCountriesCodes();
    let city = this.lookups.getCity();
    return combineLatest([companyType, countryCode, city]).pipe(
      take(1),
      map((res) => {
        return {
          companyType: res[0],
          countryCode: res[1],
          city: res[2],
        };
      })
    );
  }
}
