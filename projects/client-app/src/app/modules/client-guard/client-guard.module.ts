import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClientGuardRoutingModule } from './client-guard-routing.module';
import { CoreModule } from '../core/core.module';
import { ClientGuardComponent } from './compnents/client-guard/client-guard.component';
import { GuardCardComponent } from './compnents/client-guard/guard-card/guard-card.component';


@NgModule({
  declarations: [
    ClientGuardComponent,
    GuardCardComponent
  ],
  imports: [
    CommonModule,
    ClientGuardRoutingModule,
    CoreModule
  ]
})
export class ClientGuardModule { }
