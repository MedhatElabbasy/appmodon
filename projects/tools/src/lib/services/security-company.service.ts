import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Pagination } from '../models/pagination';
import { SecurityCompany } from '../models/security-company';

@Injectable({
  providedIn: 'root',
})
export class SecurityCompanyService {
  private url!: string;
  constructor(private http: HttpClient, @Inject('env') private env: any) {
    this.url = env.api;
  }

  getAllApprovedCompanies() {
    this.http.get<Pagination<SecurityCompany>>(
      this.url + `api/SecurityCompany/GetAllApproved?page=${1}&pageSize=${10}`
    );
  }
}
