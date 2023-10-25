import { Component, Input, OnInit, Output, EventEmitter, NO_ERRORS_SCHEMA } from '@angular/core';
import { Router } from '@angular/router';
import { Routing } from 'projects/client-app/src/app/modules/core/routes/app-routes';
import { ClientOrder } from 'projects/tools/src/public-api';

@Component({
  selector: 'app-order-card',
  templateUrl: './order-card.component.html',
  styleUrls: ['./order-card.component.scss'],

})
export class OrderCardComponent implements OnInit {
  @Input('data') data!: ClientOrder;
  @Input('showControls') showControls: boolean = false;
  @Output('accept') accept = new EventEmitter();
  @Output('refused') refused = new EventEmitter();

  constructor(private router: Router) { }

  ngOnInit(): void { }
  details(id: string) {
    this.router.navigate([`/${Routing.client.module}/${Routing.client.children.orderDetails}/${id}`,]);
  }
}
