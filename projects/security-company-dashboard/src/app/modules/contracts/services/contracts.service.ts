import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'projects/security-company-dashboard/src/environments/environment';
import { ContractStatus, OptionSetEnum, Pagination } from 'projects/tools/src/public-api';
import { AuthService } from '../../auth/services/auth.service';

import { Contract } from '../models/contracts';

@Injectable({
  providedIn: 'root',
})
export class ContractsService {
  private readonly url = environment.api;

  constructor(private http: HttpClient, private auth: AuthService) {}

  getAll(pageNumber: number, pageSize: number) {
    let companyId = this.auth.snapshot.userInfo?.id;
    return this.http.get<Pagination<Contract>>(
      this.url +
        `api/ClientSecurityContract/ComapnyId?ComapnyId=${companyId}&page=${pageNumber}&pageSize=${pageSize}`
    );
  }

  getActiveContracts(pageNumber: number, pageSize: number) {
    let companyId = this.auth.snapshot.userInfo?.id;
    return this.http.get<Pagination<Contract>>(
      this.url +
        `api/ClientSecurityContract/GetAllByComapnyAndStatus?companyId=${companyId}&OptionsetName=${OptionSetEnum.ContractStatus}&value=${ContractStatus.accepted}&page=${pageNumber}&pageSize=${pageSize}`
    );
  }

  getSuspendedContracts(pageNumber: number, pageSize: number) {
    let companyId = this.auth.snapshot.userInfo?.id;
    return this.http.get<Pagination<Contract>>(
      this.url +
        `api/ClientSecurityContract/GetAllByComapnyAndStatus?companyId=${companyId}&OptionsetName=${OptionSetEnum.ContractStatus}&value=${ContractStatus.rejectedByTakid}&page=${pageNumber}&pageSize=${pageSize}`
    );
  }

  getRejectedContracts(pageNumber: number, pageSize: number) {
    let companyId = this.auth.snapshot.userInfo?.id;
    return this.http.get<Pagination<Contract>>(
      this.url +
        `api/ClientSecurityContract/GetAllByComapnyAndStatus?companyId=${companyId}&OptionsetName=${OptionSetEnum.ContractStatus}&value=${ContractStatus.rejected}&page=${pageNumber}&pageSize=${pageSize}`
    );
  }
}
