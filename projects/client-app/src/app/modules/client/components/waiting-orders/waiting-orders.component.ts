import { FormControl, Validators, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { OrderService } from '../../../core/services/order.service';
import { AuthService } from '../../../auth/services/auth.service';
import {
  ClientCompany,
  ModalService,
  OrderStatus,
  PAGINATION_SIZES,
  Roles,
} from 'projects/tools/src/public-api';
import { ClientOrder } from '../../models/client-order';
import { ClientBranchUser } from '../../models/client-branch-user';

@Component({
  selector: 'app-waiting-orders',
  templateUrl: './waiting-orders.component.html',
  styleUrls: ['./waiting-orders.component.scss'],
})
export class WaitingOrdersComponent implements OnInit {
  orders!: ClientOrder[];
  pageNumber = 1;
  pageSize = 10;
  total!: number;
  sizes = PAGINATION_SIZES;
  isAdmin!: boolean;
  searchKey= '';
  rejectForm = new FormGroup({
    reason: new FormControl<string>('', [
      Validators.required,
      Validators.minLength(2),
    ]),
  });
  modalId = 'orders-reject-id';
  selectedOrder: ClientOrder | null = null;

  constructor(
    private orderServices: OrderService,
    private route: ActivatedRoute,
    private auth: AuthService,
    public modal: ModalService
  ) {
    this.auth.userIdentity.subscribe((res) => {
      this.isAdmin = res?.roles.includes(Roles.VirtualClientAdmin)!;
    });
  }

  ngOnInit(): void {
    this.route.data.subscribe((res) => {
      this.orders = res['orders'];

    });
  }

  onPageSizeChange(number: any) {
    this.pageSize = +number.target.value;
  }

  onReject(_order: ClientOrder) {
    this.selectedOrder = _order;
    this.modal.open(this.modalId);
  }

  approve(_order: ClientOrder) {
    this.orderServices.approveClient(_order.id).subscribe((res) => {
      this.getOrders();
    });
  }

  reject() {
    if (this.rejectForm.valid) {
      this.orderServices
        .rejectClientOrder(
          this.selectedOrder?.id!,
          this.rejectForm.controls['reason'].value!
        )
        .subscribe((res) => {
          this.orderServices
            .updateStatus(this.selectedOrder?.id!, OrderStatus.rejected)
            .subscribe(() => {});
          this.getOrders();
          this.modal.close(this.modalId)
        });
    }
  }

  getOrders() {
    let orders;
    if (
      this.auth.snapshot.userIdentity?.roles.includes(Roles.VirtualClientAdmin)
    ) {
      if (this.auth.snapshot.userIdentity?.role == Roles.Company) {
        orders = this.orderServices.getAllWaitingApprovedByClientId(
          (this.auth.snapshot.userInfo as ClientCompany).id
        );
      } else {
        orders = this.orderServices.getAllWaitingApprovedByClientId(
          (this.auth.snapshot.userInfo as ClientBranchUser).clientCompany.id
        );
      }
    } else {
      orders = this.orderServices.getAllApprovedByBranchId(
        (this.auth.snapshot.userInfo as ClientBranchUser).clientCompanyBranchId
      );
    }

    orders.subscribe((res) => (this.orders = res));
  }
}
