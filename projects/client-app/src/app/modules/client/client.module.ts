import {      NgModule    } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ClientRoutingModule } from './client-routing.module';
import { ClientComponent } from './client.component';
import { CoreModule } from '../core/core.module';
import { ClientBranchesComponent } from './components/client-branches/client-branches.component';
import { ClientOrdersComponent } from './components/client-orders/client-orders.component';
import { ClientBranchesUsersComponent } from './components/client-branches-users/client-branches-users.component';
import { WaitingOrdersComponent } from './components/waiting-orders/waiting-orders.component';
import { BranchOrdersComponent } from './components/branch-orders/branch-orders.component';
import { AllOrdersComponent } from './components/all-orders/all-orders.component';
import { ManageOrdersComponent } from './components/manage-orders/manage-orders.component';
import { MonitoringComplaintsComponent } from './components/monitoring-complaints/monitoring-complaints.component';
import { ComplaintsComponent } from './components/complaints/complaints.component';
import { SanitizerPipe } from './pipe/sanitizer.pipe';
import { InfractionDetailsComponent } from './components/infraction-details/infraction-details.component';
import { OrderDetailsComponent } from './components/order-details/order-details.component';

@NgModule({
  declarations: [
    ClientComponent,
    ClientBranchesComponent,
    ClientOrdersComponent,
    ClientBranchesUsersComponent,
    WaitingOrdersComponent,
    BranchOrdersComponent,
    AllOrdersComponent,
    ManageOrdersComponent,
    MonitoringComplaintsComponent,
    ComplaintsComponent,
    SanitizerPipe,
    InfractionDetailsComponent,
    OrderDetailsComponent,
  ],
      
  imports: [CoreModule, ClientRoutingModule],
})
export class ClientModule {}
