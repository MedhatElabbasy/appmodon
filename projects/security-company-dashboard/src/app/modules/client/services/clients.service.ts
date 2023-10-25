import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'projects/security-company-dashboard/src/environments/environment';
import { Pagination } from 'projects/tools/src/public-api';
import { AuthService } from '../../auth/services/auth.service';
import { Client } from '../models/clients';
import { Observable } from 'rxjs';
import { FormGroup } from '@angular/forms';

@Injectable({
  providedIn: 'root',
})
export class ClientsService {
  private readonly url = environment.api;
  constructor(private http: HttpClient, private auth: AuthService) {}

  getClientsBySecurityCompany(pageNumber: number, pageSize: number) {
    let companyID = this.auth.snapshot.userInfo?.id;
    return this.http.get<Pagination<Client>>(
      this.url +
        `api/SecurityCompanyClients/GetAllbySecurityCompanyid?companyID=${companyID}&page=${pageNumber}&pageSize=${pageSize}`
    );
  }

  getClientsByBranchId(pageNumber: number, pageSize: number) {
    let id = this.auth.snapshot.userInfo?.securityCompanyBranch?.id;
    return this.http.get<Pagination<Client>>(
      this.url +
        `api/SecurityCompanyClients/GetAllByBranchId?BranchId=${id}&page=${pageNumber}&pageSize=${pageSize}`
    );
  }

  getClientDetailsById(id: string) {
    return this.http.get<Client>(
      this.url + `api/SecurityCompanyClients/GetById?Id=${id}`
    );
  }
  getALL(): Observable<any> {
    return this.http.get(
      this.url + `api/ClientCompany/GetAllClientCompany?page=1&pageSize=10000`
    );
  }
  createContract(data: FormGroup): Observable<any> {
    return this.http.post(
      this.url + `api/ClientSecurityContract/CreateOld`,
      data.value
    );
  }
  createClient(data: any): Observable<any> {
    return this.http.post(this.url + `api/SecurityCompanyClients/Create`, data);
  }
}
