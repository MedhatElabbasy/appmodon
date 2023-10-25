import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'projects/security-company-dashboard/src/environments/environment';
import { SecurityCompany } from 'projects/tools/src/public-api';

@Injectable({
  providedIn: 'root',
})
export class AccountService {
  private readonly url = environment.api;
  constructor(private http: HttpClient) {}

  updateCompanyAccount(model: SecurityCompany) {
    return this.http.post(this.url + `api/SecurityCompany/Update`, model);
  }
}
