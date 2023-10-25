import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  Router,
  Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot,
} from '@angular/router';
import { environment } from 'projects/client-app/src/environments/environment';
import { SecurityCompany } from 'projects/tools/src/lib/models/security-company';
import { Observable } from 'rxjs';
import { Pagination } from 'projects/tools/src/public-api';

@Injectable({
  providedIn: 'root',
})
export class SecurityCompaniesResolver
  implements Resolve<Pagination<SecurityCompany>>
{
  constructor(private http: HttpClient) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<Pagination<SecurityCompany>> {
    return this.http.get<Pagination<SecurityCompany>>(
      environment.api +
        `api/SecurityCompany/GetAllApproved?page=${1}&pageSize=${10}`
    );
  }
}
