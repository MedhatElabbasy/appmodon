import { Component, OnInit } from '@angular/core';
import { OrderSidebar } from '../../routes/client-routes.enum';

@Component({
  selector: 'app-manage-orders',
  templateUrl: './manage-orders.component.html',
  styleUrls: ['./manage-orders.component.scss'],
})
export class ManageOrdersComponent implements OnInit {
  list = [...OrderSidebar];

  constructor() {}

  ngOnInit(): void {}
}
