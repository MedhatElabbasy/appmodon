import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'projects/security-company-dashboard/src/environments/environment';
import { CompanyUser } from '../models/company-user';

@Injectable({
  providedIn: 'root',
})
export class SecurityCompanyUserService {
  private readonly url = environment.api;

  constructor(private http: HttpClient) {}

  getAllByBranchId(id: any) {
    return this.http.get<CompanyUser[]>(
      this.url + `api/SecurityCompanyUser/GetAllByBransh?id=${id}`
    );
  }

  add(model: any) {
    return this.http.post(this.url + `api/SecurityCompanyUser/Add`, model);
  }

  edit(model: any) {
    return this.http.post(this.url + `api/SecurityCompanyUser/Update`, model);
  }

  delete(id: string) {
    return this.http.post(
      this.url + `api/SecurityCompanyUser/Delete?Id=${id}`,
      null
    );
  }
}
