import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'projects/security-company-dashboard/src/environments/environment';
import { Pagination } from 'projects/tools/src/public-api';
import { ClientOrder } from 'projects/tools/src/public-api';
import { Client } from '../models/clients';
import { ContractModel } from '../models/contract';

@Injectable({
  providedIn: 'root',
})
export class CompanyOrdersService {
  private readonly url = environment.api;

  constructor(private http: HttpClient) {}

  getAllByBranchId(id: string) {
    return this.http.get<ClientOrder[]>(
      this.url + `api/ClientOrder/GetAllByBranshId?BranchId=${id}`
    );
  }

  approve(id: any, mainBranchId: any, branchId: any) {
    return this.http.get(
      this.url +
        `api/ClientOrder/Approve?id=${id}&MainbranchId=${mainBranchId}&newbranchI=${branchId}`
    );
  }

  reject(id: string, CancelReson: string) {
    return this.http.get(
      this.url +
        `api/ClientOrder/CancelOrder?id=${id}&CancelReson=${CancelReson}`
    );
  }
  createContract(model: ContractModel) {
    return this.http.post(
      this.url + `api/ClientSecurityContract/Create`,
      model
    );
  }

  updateOrder(model: any) {
    return this.http.post(this.url + `api/ClientOrder/Update`, model);
  }

  updateOrderStatus(orderId: string, optionSetName: string, value: number) {
    return this.http.get(
      this.url +
        `api/ClientOrder/UpdateOrderStatusType?orderId=${orderId}&optionSetName=${optionSetName}&value=${value}`
    );
  }
}
