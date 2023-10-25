import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Routing } from 'projects/security-company-dashboard/src/app/modules/core/routes/app-routes';
import { ClientSite } from '../../../../models/client-site';
import { ClientsRoutes } from '../../../../routes/clients-routes.enum';

@Component({
  selector: 'app-site-card',
  templateUrl: './site-card.component.html',
  styleUrls: ['./site-card.component.scss'],
})
export class SiteCardComponent implements OnInit {
  @Input('site') site!: ClientSite;
  @Output('edit') edit = new EventEmitter();
  details = `/${Routing.dashboard}/${Routing.clients.module}/${Routing.clients.children.clientDetails}/${this.route.parent?.snapshot.params['id']}/${this.route.parent?.snapshot.params['clientId']}/${Routing.clients.children.siteDetails}`;

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {}

  onUpdate() {
    this.edit.emit(this.site);
  }
}
