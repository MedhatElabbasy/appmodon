import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Routing } from 'projects/security-company-dashboard/src/app/modules/core/routes/app-routes';
import { ClientSite } from '../../../../models/client-site';

@Component({
  selector: 'app-client-guards',
  templateUrl: './client-guards.component.html',
  styleUrls: ['./client-guards.component.scss'],
})
export class ClientGuardsComponent implements OnInit {
  sites!: ClientSite[];
  locationLink = `/${Routing.dashboard}/${Routing.clients.module}/${Routing.clients.children.clientDetails}/${this.route.parent?.snapshot.params['id']}/${this.route.parent?.snapshot.params['clientId']}/${Routing.clients.children.guards}/${Routing.clients.children.locationGuards}`;
  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.data.subscribe((res) => {
      this.sites = res['sites'];
    });
  }
  getLocationOfSite(event: any) {}
}
