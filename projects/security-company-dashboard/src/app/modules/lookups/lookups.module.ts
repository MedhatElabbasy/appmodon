import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LookupsRoutingModule } from './lookups-routing.module';
import { MonitoringComplaintsComponent } from './components/monitoring-complaints/monitoring-complaints.component';
import { InfractionDetailsComponent } from './components/infraction-details/infraction-details.component';
import { LookupsComponent } from './components/lookups/lookups.component';
import { CoreModule } from '../core/core.module';
import { ComplaintsComponent } from './components/complaints/complaints.component';


@NgModule({
  declarations: [
    MonitoringComplaintsComponent,
    InfractionDetailsComponent,
    LookupsComponent,
    ComplaintsComponent
  ],
  imports: [
    CommonModule,
    CoreModule,
    LookupsRoutingModule
  ]
})
export class LookupsModule { }
