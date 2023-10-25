import { HttpClient } from '@angular/common/http';
import { environment } from './../../../../environments/environment';
import { Injectable } from '@angular/core';
import { OptionSetEnum } from 'projects/tools/src/public-api';
import { ClientOrder } from '../../client/models/client-order';

@Injectable({
  providedIn: 'root',
})
export class OrderService {
  private readonly url = environment.api;
  constructor(private http: HttpClient) {}

  getAllOrdersByClientId(id: number) {
    return this.http.get<ClientOrder[]>(
      this.url + `api/ClientOrder/GetAllByClientCompnay?ClientCompanyId=${id}`
    );
  }

  getAllByBranchId(id: String) {
    return this.http.get<ClientOrder[]>(
      this.url + `api/ClientOrder/GetAllByClientBranshId?branshId=${id}`
    );
  }

  getAllApprovedByClientId(id: string) {
    return this.http.get<ClientOrder[]>(
      this.url + `api/ClientOrder/GetAllApprovedByClientCompnay?ClientId=${id}`
    );
  }

  getAllApprovedByBranchId(id: string) {
    return this.http.get<ClientOrder[]>(
      this.url + `api/ClientOrder/GetAllApprovedByClientBranshId?BranshId=${id}`
    );
  }

  getAllWaitingApprovedByClientId(id: number) {
    return this.http.get<ClientOrder[]>(
      this.url +
        `api/ClientOrder/GetAllWattingApproveByClientCompnay?ClientId=${id}`
    );
  }

  getAllWaitingApprovedByBranchId(id: string) {
    return this.http.get<ClientOrder[]>(
      this.url +
        `api/ClientOrder/GetAllWattingApproveClientBranshId?BranshId=${id}`
    );
  }

  updateStatus(id: string, status: number) {
    return this.http.get(
      this.url +
        `api/ClientOrder/UpdateOrderStatusType?orderId=${id}&optionSetName=${OptionSetEnum.OrderStatus}&value=${status}`
    );
  }

  update(order: ClientOrder) {
    return this.http.post(this.url + `api/ClientOrder/Update`, order);
  }

  approveClient(orderId: string, MainBranchId?: string, branchId?: string) {
    return this.http.get(
      this.url + `api/ClientOrder/ApprovedByClientMainBransh?id=${orderId}`
    );
  }

  rejectClientOrder(orderId: string, reason: string) {
    return this.http.get(
      this.url +
        `api/ClientOrder/CancelOrder?id=${orderId}&CancelReson=${reason}`
    );
  }

 
}
