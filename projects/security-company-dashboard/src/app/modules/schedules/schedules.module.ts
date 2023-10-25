import {      NgModule    } from '@angular/core';
import { SchedulesRoutingModule } from './schedules-routing.module';
import { SchedulesComponent } from './components/schedules/schedules.component';
import { CompanyShiftComponent } from './components/company-shift/company-shift.component';
import { CoreModule } from '../core/core.module';
import { CompanyShiftCardComponent } from './components/company-shift-card/company-shift-card.component';

@NgModule({
  declarations: [SchedulesComponent, CompanyShiftComponent, CompanyShiftCardComponent],
      
  imports: [CoreModule, SchedulesRoutingModule],
})
export class SchedulesModule {}
