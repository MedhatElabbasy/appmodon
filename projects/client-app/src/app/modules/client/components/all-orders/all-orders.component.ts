import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
//import { OrderSidebar } from '../../routes/client-routes.enum';
import { ClientOrder, PAGINATION_SIZES, Roles } from 'projects/tools/src/public-api';
import { OrderService } from '../../../core/services/order.service';
import { AuthService } from '../../../auth/services/auth.service';

@Component({
  selector: 'app-all-orders',
  templateUrl: './all-orders.component.html',
  styleUrls: ['./all-orders.component.scss'],
})
export class AllOrdersComponent implements OnInit {
  orders!: ClientOrder[];
  pageNumber = 1;
  pageSize = 10;
  total!: number;
  sizes = PAGINATION_SIZES;
  searchKey!: string

  constructor(
    private order: OrderService,
    private route: ActivatedRoute,
    private auth: AuthService
  ) {}

  ngOnInit(): void {
    this.route.data.subscribe((res) => {
      if(res){
      this.orders = res['orders'];
console.log(this.orders);
      }
    });
  }

  onPageSizeChange(number: any) {
    this.pageSize = +number.target.value;
  }
}
