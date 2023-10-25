import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import {
  CanvasService,
  ClientOrder,
  LangService,
  OptionSetEnum,
  OrderStatus,
  PAGINATION_SIZES,
} from 'projects/tools/src/public-api';
import { AuthService } from '../../../auth/services/auth.service';
import { JobService } from '../../../jobs/services/job.service';
import { CLIENTS_MODULE_TITLE } from '../../client.component';
import { Contract, ContractModel } from '../../models/contract';
import { CompanyOrdersService } from '../../services/company-orders.service';


@Component({
  selector: 'app-approved-requests',
  templateUrl: './approved-requests.component.html',
  styleUrls: ['./approved-requests.component.scss'],
})
export class ApprovedRequestsComponent implements OnInit {
  pageNumber = 1;
  pageSize = 10;
  total!: number;
  sizes = [...PAGINATION_SIZES];
  requests!: ClientOrder[];
  canvasId = 'request-details';
  selectedRequest!: ClientOrder;
  isAr!: Observable<boolean>;
  approvedByMain = OrderStatus.approvedByMain;
  searchKey = '';

  constructor(
    public canvasService: CanvasService,
    private route: ActivatedRoute,
    private lang: LangService,
    private auth: AuthService,
    private orderServices: CompanyOrdersService
  ) {
    this.isAr = this.lang.isAr;
    CLIENTS_MODULE_TITLE.next('clients.clients_requests');
  }

  ngOnInit(): void {
    this.getInitDate();
  }

  getInitDate() {
    this.route.data.subscribe((res: any) => {
      this.requests = res.orders;
    });
  }

  onPageSizeChange(number: any) {
    this.pageSize = +number.target.value;
  }

  showRequestDetails(order: ClientOrder) {
    this.selectedRequest = order;
    this.canvasService.open(this.canvasId);
  }

  getOrders() {
    let id = this.auth.snapshot.userInfo?.securityCompanyBranch.id!;
    this.orderServices.getAllByBranchId(id).subscribe((res) => {
      this.requests = res;
    });
  }

  createContract() {
    let model: ContractModel = {
      securityCompanyId: this.selectedRequest.securityCompany?.id!,
      clientCompanyId: this.selectedRequest.clientCompany?.id!,
      startDate: this.selectedRequest.startDate,
      endDate: this.selectedRequest.endDate,
      securityCompanyBranchId:
        this.auth.snapshot.userInfo?.securityCompanyBranch.id!,
      contractTypeId: this.selectedRequest.contractType?.id!,
      clientOrderId: this.selectedRequest.id,
    };

    this.orderServices.createContract(model).subscribe(() => {
      this.orderServices
        .updateOrderStatus(
          this.selectedRequest.id,
          OptionSetEnum.OrderStatus,
          OrderStatus.contractCreated
        )
        .subscribe((res) => {
          this.getOrders();
          this.canvasService.close(this.canvasId);
        });
    });
  }
}
