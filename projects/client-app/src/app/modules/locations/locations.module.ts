import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LocationsRoutingModule } from './locations-routing.module';
import { LocationComponent } from './components/location/location.component';
import { CoreModule } from '../core/core.module';
import { AllBranchesComponent } from './components/all-branches/all-branches.component';


@NgModule({
  declarations: [
    LocationComponent,
    AllBranchesComponent
  ],
  imports: [
    CommonModule,
    LocationsRoutingModule,
    CoreModule
  ]
})
export class LocationsModule { }
