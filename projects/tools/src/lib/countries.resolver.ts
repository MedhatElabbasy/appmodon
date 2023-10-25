import { Injectable } from '@angular/core';
import {
  Router,
  Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot,
} from '@angular/router';
import { Observable, of } from 'rxjs';
import { LookupService, CountryCode } from '../public-api';

@Injectable({
  providedIn: 'root',
})
export class CountriesResolver implements Resolve<CountryCode[]> {
  constructor(private lookups: LookupService) {}
  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<CountryCode[]> {
    return this.lookups.getCountriesCodes();
  }
}
