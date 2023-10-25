import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { combineLatest, Observable } from 'rxjs';
import {
  Branch,
  LangService,
  OptionSetEnum,
  OrderStatus,
  RequestsService,
} from 'projects/tools/src/public-api';
import { ModalService } from 'projects/tools/src/public-api';
import {
  CanvasService,
  ClientOrder,
  PAGINATION_SIZES,
} from 'projects/tools/src/public-api';
import { AuthService } from '../../../auth/services/auth.service';
import { BranchesService } from '../../../branches/services/branches.service';
import { CLIENTS_MODULE_TITLE } from '../../client.component';
import { CompanyOrdersService } from '../../services/company-orders.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-new-requests',
  templateUrl: './new-requests.component.html',
  styleUrls: ['./new-requests.component.scss'],
})
export class NewRequestsComponent implements OnInit {
  pageNumber = 1;
  pageSize = 10;
  total!: number;
  sizes = [...PAGINATION_SIZES];
  requests!: ClientOrder[];
  canvasId = 'request-details';
  selectedRequest!: ClientOrder;
  branches!: Branch[];
  approveModal = 'approve-order-modal';
  rejectModal = 'reject-order-modal';
  selectedBranch: Branch | null = null;
  isAr!: Observable<boolean>;
  mainBranchId!: string;
  searchKey = '';
  Reason: FormGroup = this.fb.group({
    reason: ['', [Validators.required,Validators.minLength(10)]],
  });
  constructor(
    public canvasService: CanvasService,
    private route: ActivatedRoute,
    private modal: ModalService,
    private lang: LangService,
    private orderServices: CompanyOrdersService,
    private branchesServices: BranchesService,
    private requestService: RequestsService,
    private auth: AuthService,
    private fb: FormBuilder
  ) {
    this.isAr = this.lang.isAr;
    this.mainBranchId = this.auth.snapshot.userInfo?.securityCompanyBranch.id!;
    CLIENTS_MODULE_TITLE.next('clients.clients_requests');
  }

  ngOnInit(): void {
    this.getInitDate();
  }

  getInitDate() {
    this.route.data.subscribe((res: any) => {
      this.requests = res.orders.orders.filter(
        (e: any) => !e.isApprovedByMainBranch
      );
      this.branches = res.orders.branches;
    });
  }

  reload() {
    let branches$ = this.branchesServices.getAllByCompanyId();
    let requests$ = this.requestService.getAllBySecurityCompany(
      this.auth.snapshot.userInfo?.id!
    );

    combineLatest([branches$, requests$]).subscribe((res: any) => {
      this.branches = res[0];
      this.requests = res[1].filter((e: any) => !e.isApprovedByMainBranch);
    });
  }

  onPageSizeChange(number: any) {
    this.pageSize = +number.target.value;
    this.reload();
  }

  onPageNumberChange(event: number) {
    this.pageNumber = event;
    this.reload();
  }

  showRequestDetails(order: ClientOrder) {
    this.selectedRequest = order;
    this.canvasService.open(this.canvasId);
  }

  onApprove() {
    this.modal.open(this.approveModal);
  }
  onReject() {
    this.modal.open(this.rejectModal);
  }
  reject(data: FormGroup) {
    this.orderServices
    .reject(
      this.selectedRequest.id,
      data.value.reason
    )
    .subscribe(() => {
      this.selectedBranch = null;
      this.modal.close(this.rejectModal);
      this.canvasService.close(this.canvasId);
      this.orderServices
        .updateOrderStatus(
          this.selectedRequest.id,
          OptionSetEnum.OrderStatus,
          OrderStatus.rejected
        )
        .subscribe((res) => this.reload());
    });
  }
  approve() {
    this.orderServices
      .approve(
        this.selectedRequest.id,
        this.mainBranchId,
        this.selectedBranch?.id
      )
      .subscribe(() => {
        this.selectedBranch = null;
        this.modal.close(this.approveModal);
        this.canvasService.close(this.canvasId);
        this.orderServices
          .updateOrderStatus(
            this.selectedRequest.id,
            OptionSetEnum.OrderStatus,
            OrderStatus.approvedByMain
          )
          .subscribe((res) => this.reload());
      });
  }
}
