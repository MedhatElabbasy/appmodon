import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CompleteProfileRoutingModule } from './complete-profile-routing.module';
import { CompleteComponent } from './components/complete/complete.component';
import { CoreModule } from '../core/core.module';
import { CompanyDetailsComponent } from './components/company-details/company-details.component';
import { CompanyRepresentativeComponent } from './components/company-representative/company-representative.component';
import { CommissionerRepresentativeComponent } from './components/commissioner-representative/commissioner-representative.component';


@NgModule({
  declarations: [
    CompleteComponent,
    CompanyDetailsComponent,
    CompanyRepresentativeComponent,
    CommissionerRepresentativeComponent
  ],
  imports: [
    CommonModule,
    CompleteProfileRoutingModule,
    CoreModule
  ]
})
export class CompleteProfileModule { }
