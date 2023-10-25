import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LangService, Pagination } from 'projects/tools/src/public-api';
import { Roles } from 'projects/tools/src/public-api';
import { PAGINATION_SIZES } from 'projects/tools/src/public-api';
import { AuthService } from '../../../auth/services/auth.service';
import { Routing } from '../../../core/routes/app-routes';
import { CLIENTS_MODULE_TITLE } from '../../client.component';
import { Client } from '../../models/clients';
import { ClientsService } from '../../services/clients.service';

@Component({
  selector: 'app-clients-list',
  templateUrl: './clients-list.component.html',
  styleUrls: ['./clients-list.component.scss'],
})
export class ClientsListComponent implements OnInit {
  pageNumber = 1;
  pageSize = 10;
  sizes = [...PAGINATION_SIZES];
  clientsList!: Pagination<Client>;
  link = `/${Routing.dashboard}/${Routing.clients.module}/${Routing.clients.children.clientDetails}`;
  searchKey = '';

  constructor(
    private route: ActivatedRoute,
    private auth: AuthService,
    private clientsServices: ClientsService,
    public lang: LangService,
    private router: Router,
  ) {
    CLIENTS_MODULE_TITLE.next('clients.clients');
  }

  ngOnInit(): void {
    this.getInitDate();
  }

  onPageSizeChange(number: any) {
    this.pageSize = +number.target.value;
    this.getClients();
  }

  onPageNumberChange(event: number) {
    this.pageNumber = event;
    this.getClients();
  }

  getInitDate() {
    this.route.data.subscribe((res: any) => {
      this.clientsList = res['clients'];
    });
  }

  getClients() {
    let data$;
    const isAdmin = this.auth.snapshot.userIdentity?.roles.includes(
      Roles.VirtualAdmin
    );

    if (isAdmin) {
      data$ = this.clientsServices.getClientsBySecurityCompany(1, 10);
    } else {
      data$ = this.clientsServices.getClientsByBranchId(1, 10);
    }

    data$.subscribe((res) => {
      this.clientsList = res;
    });
  }
  getDetails(client: Client) {
    const link = `/${Routing.dashboard}/${Routing.clients.module}/${Routing.clients.children.clientDetails}/${client.id}/${client.clientCompany.id}`;
    this.router.navigate([link]);
  }
}
