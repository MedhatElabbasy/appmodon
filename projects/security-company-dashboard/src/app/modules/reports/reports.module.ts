import {      NgModule    } from '@angular/core';

import { ReportsRoutingModule } from './reports-routing.module';
import { ReportsComponent } from './reports.component';
import { AccidentsComponent } from './components/accidents/accidents.component';
import { AttendanceComponent } from './components/attendance/attendance.component';
import { VisitorsComponent } from './components/visitors/visitors.component';
import { CoreModule } from '../core/core.module';
import { ReportCardComponent } from './components/report-card/report-card.component';

@NgModule({
  declarations: [
    ReportsComponent,
    AccidentsComponent,
    AttendanceComponent,
    VisitorsComponent,
    ReportCardComponent,
  ],
      
  imports: [CoreModule, ReportsRoutingModule],
})
export class ReportsModule {}
