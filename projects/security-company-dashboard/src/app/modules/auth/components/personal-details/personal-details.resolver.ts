import { Injectable } from '@angular/core';
import {
  Router,
  Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot,
} from '@angular/router';
import { City } from 'projects/tools/src/lib/models/city';
import { BusinessType } from 'projects/tools/src/lib/models/security-company';
import { combineLatest, map, Observable } from 'rxjs';
import { CountryCode, LookupService } from 'projects/tools/src/public-api';

@Injectable({
  providedIn: 'root',
})
export class PersonalDetailsResolver implements Resolve<any> {
  constructor(private lookups: LookupService) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<any> {
    let codes$ = this.lookups.getCountriesCodes();
    let cities$ = this.lookups.getCity();
    let businessType$ = this.lookups.getBusinessTypes();

    return combineLatest([codes$, cities$, businessType$]).pipe(
      map((res) => {
        return {
          codes: res[0],
          cities: res[1],
          businessTypes: res[2],
        };
      })
    );
  }
}
