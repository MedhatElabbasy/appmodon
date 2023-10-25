import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReportsRoutingModule } from './reports-routing.module';
import { ReportsComponent } from './reports/reports.component';
import { AccidentsComponent } from './components/accidents/accidents.component';
import { AttendanceComponent } from './components/attendance/attendance.component';
import { VisitorsComponent } from './components/visitors/visitors.component';
import { ReportCardComponent } from './components/report-card/report-card.component';
import { CoreModule } from '../core/core.module';
import { GuardComponent } from './components/attendance/guard/guard.component';
import { SuperVisorComponent } from './components/attendance/super-visor/super-visor.component';
//import { CoreModule_1 as CoreModule } from "../../../../../security-company-dashboard/src/app/modules/core/core.module";


@NgModule({
    declarations: [
        ReportsComponent,
        AccidentsComponent,
        AttendanceComponent,
        VisitorsComponent,
        ReportCardComponent,
        GuardComponent,
        SuperVisorComponent
    ],
    imports: [
        CommonModule,
        ReportsRoutingModule, CoreModule
    ]
})
export class ReportsModule { }
