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
import { SecurityAuditModelComponent } from './components/security-audit-model/security-audit-model.component';
import { CanvasJSChart } from 'projects/client-app/src/assets/canvasjs.angular.component';
import { SecurityAuditModelStep2Component } from './components/security-audit-model-step2/security-audit-model-step2.component';
import { SecurityAuditModelStep3Component } from './components/security-audit-model-step3/security-audit-model-step3.component';
import { SecurityAuditFormNotesComponent } from './components/security-audit-form-notes/security-audit-form-notes.component';
import { SecurityAuditPhotosComponent } from './components/security-audit-photos/security-audit-photos.component';
import { SecurityAuditComponent } from './components/security-audit/security-audit.component';
import { SecurityAuditViewComponent } from './components/security-audit-view/security-audit-view.component';
import { MissionsComponent } from './components/missions/missions.component';
import { ToursComponent } from './components/tours/tours.component';


//import { CoreModule_1 as CoreModule } from "../../../../../security-company-dashboard/src/app/modules/core/core.module";


@NgModule({
    declarations: [
        ReportsComponent,
        AccidentsComponent,
        AttendanceComponent,
        VisitorsComponent,
        ReportCardComponent,
        GuardComponent,
        SuperVisorComponent,
        SecurityAuditModelComponent,
        SecurityAuditModelStep2Component,
        SecurityAuditModelStep3Component,
        SecurityAuditFormNotesComponent,
        SecurityAuditPhotosComponent,
        SecurityAuditComponent,
        SecurityAuditViewComponent,
        MissionsComponent,
        ToursComponent
    ],
    imports: [
        CommonModule,
        CoreModule,
        ReportsRoutingModule, CoreModule
    ],

})
export class ReportsModule { }
