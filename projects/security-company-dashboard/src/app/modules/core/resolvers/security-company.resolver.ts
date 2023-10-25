import { Injectable } from '@angular/core';
import {
  Router,
  Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot,
} from '@angular/router';
import { Observable, of } from 'rxjs';
import { SecurityCompany } from 'projects/tools/src/public-api';
import { AuthService } from '../../auth/services/auth.service';

@Injectable({
  providedIn: 'root',
})
export class SecurityCompanyResolver implements Resolve<SecurityCompany> {
  constructor(private auth: AuthService) {}
  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<SecurityCompany> {
    return this.auth.getSecurityCompany();
  }
}
