import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { DashGuardCardComponent } from './components/dash-guard-card/dash-guard-card.component';
import { CoreModule } from '../core/core.module';


@NgModule({
  declarations: [
    DashboardComponent,
    DashGuardCardComponent
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    CoreModule
  ]
})
export class DashboardModule { }
