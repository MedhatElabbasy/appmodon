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
export class CompanyDetailsResolver implements Resolve<any> {
  constructor(private lookups: LookupService) {}
  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<any> {
    let timZone$ = this.lookups.getTimeZone();
    let financialYear = this.lookups.getFinanceYear();
    let codes$ = this.lookups.getCountriesCodes();
    return combineLatest([timZone$, financialYear, codes$]).pipe(
      map((res) => ({ timeZone: res[0], finYear: res[1], codes: res[2] }))
    );
  }
}
