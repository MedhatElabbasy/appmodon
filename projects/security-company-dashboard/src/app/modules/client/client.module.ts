import {      NgModule    } from '@angular/core';
import { CoreModule } from '../core/core.module';

import { ClientRoutingModule } from './client-routing.module';
import { ClientComponent } from './client.component';
import { ClientsListComponent } from './components/clients-list/clients-list.component';
import { NewRequestsComponent } from './components/new-requests/new-requests.component';
import { ApprovedRequestsComponent } from './components/approved-requests/approved-requests.component';
import { ClientDetailsComponent } from './components/client-details/client-details.component';
import { GeneralDetailsComponent } from './components/client-details/components/general-details/general-details.component';

import { ClientBankDetailsComponent } from './components/client-details/components/client-bank-details/client-bank-details.component';
import { ClientSitesComponent } from './components/client-details/components/client-sites/client-sites.component';
import { ClientGuardsComponent } from './components/client-details/components/client-guards/client-guards.component';
import { SiteCardComponent } from './components/client-details/components/site-card/site-card.component';
import { SiteDetailsComponent } from './components/client-details/components/site-details/site-details.component';
import { ShiftsComponent } from './components/client-details/components/site-details/components/shifts/shifts.component';
import { LocationGuardsComponent } from './components/client-details/components/client-guards/components/location-guards/location-guards.component';
import { GuardCardComponent } from './components/client-details/components/client-guards/components/guard-card/guard-card.component';
import { LocationCardComponent } from './components/client-details/components/site-details/components/location-card/location-card.component';

@NgModule({
  declarations: [
    ClientComponent,
    ClientsListComponent,
    NewRequestsComponent,
    ApprovedRequestsComponent,
    ClientDetailsComponent,
    GeneralDetailsComponent,
    ClientBankDetailsComponent,
    ClientSitesComponent,
    ClientGuardsComponent,
    SiteCardComponent,
    SiteDetailsComponent,
    ShiftsComponent,
    LocationGuardsComponent,
    GuardCardComponent,
    LocationCardComponent,
  ],
      
  imports: [CoreModule, ClientRoutingModule],
})
export class ClientModule {}
