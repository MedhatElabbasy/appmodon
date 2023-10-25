import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { Routing } from '../../../core/routes/app-routes';
import { Client } from '../../models/clients';
import { ClientDetailsRoutesList } from '../../routes/clients-routes.enum';

@Component({
  selector: 'app-client-details',
  templateUrl: './client-details.component.html',
  styleUrls: ['./client-details.component.scss'],
})
export class ClientDetailsComponent implements OnInit {
  links = [...ClientDetailsRoutesList];
  excluded = Routing.clients.children.guards;
  client!: Client;
  backLink = `/${Routing.dashboard}/${Routing.clients.module}/${Routing.clients.children.clientsList}`;
  constructor(public router: Router, private route: ActivatedRoute) {}

  ngOnInit() {
    this.route.data.subscribe((res) => {
      this.client = res['client'];
    });
  }
}
