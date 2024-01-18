import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ReportsRoutes } from './routes/reports-routes.enum';
import { ReportsComponent } from './reports/reports.component';
import { AccidentsComponent } from './components/accidents/accidents.component';
import { AccidentsResolver } from './components/accidents/accidents.resolver';
import { AttendanceComponent } from './components/attendance/attendance.component';
import { AttendanceResolver } from './components/attendance/attendance.resolver';
import { VisitorsComponent } from './components/visitors/visitors.component';
import { VisitorsReportsResolver } from './components/visitors/visitors-reports.resolver';
import { GuardComponent } from './components/attendance/guard/guard.component';
import { SuperVisorComponent } from './components/attendance/super-visor/super-visor.component';
import { SupreVisorResolver } from './components/attendance/super-visor/supre-visor.resolver';
import { GuardResolver } from './components/attendance/guard/guard.resolver';
import { SecurityAuditModelComponent } from './components/security-audit-model/security-audit-model.component';
import { SecurityAuditModelStep2Component } from './components/security-audit-model-step2/security-audit-model-step2.component';
import { SecurityAuditModelStep3Component } from './components/security-audit-model-step3/security-audit-model-step3.component';
import { SecurityAuditFormNotesComponent } from './components/security-audit-form-notes/security-audit-form-notes.component';
import { SecurityAuditPhotosComponent } from './components/security-audit-photos/security-audit-photos.component';
import { SecurityAuditComponent } from './components/security-audit/security-audit.component';
import { SecurityAuditViewComponent } from './components/security-audit-view/security-audit-view.component';
import { MissionsComponent } from './components/missions/missions.component';
import { ToursComponent } from './components/tours/tours.component';


const routes: Routes = [
  { path: '', redirectTo: ReportsRoutes.allReports, pathMatch: 'full' },
  { path: ReportsRoutes.allReports, component: ReportsComponent },
  {
    path: ReportsRoutes.accidents,
    component: AccidentsComponent,
    resolve: {
      report: AccidentsResolver,
    },
  },
  {
    path: ReportsRoutes.attendance,
    component: AttendanceComponent,
    children: [
      {
        path: '',
        redirectTo: ReportsRoutes.guardAttendance,
        pathMatch: 'full',
      },
      {
        path: ReportsRoutes.guardAttendance,
        component: GuardComponent
        // ,
        // resolve: {
        //   report: GuardResolver,
        // },
      },
      {
        path: ReportsRoutes.superVisorAttendance,
        component: SuperVisorComponent
        // ,
        // resolve: {
        //   report: SupreVisorResolver,
        // },
      },
    ],
  },
  {
    path: ReportsRoutes.visitors,
    component: VisitorsComponent,
    resolve: {
      report: VisitorsReportsResolver,
    },
  },
  {
       path: ReportsRoutes.securityAudit,
       component: SecurityAuditComponent
     },
     {
      path: ReportsRoutes.securityAuditView,
      component: SecurityAuditViewComponent
    },
    {
      path: ReportsRoutes.missions,
      component: MissionsComponent,
    },
    {
      path: ReportsRoutes.tours,
      component: ToursComponent,
    },
  // {
  //   path: ReportsRoutes.securityAuditModel,
  //   component: SecurityAuditModelComponent
  // },
  // {
  //   path: ReportsRoutes.securityAuditModelStep2,
  //   component: SecurityAuditModelStep2Component
  // },
  // {
  //   path: ReportsRoutes.securityAuditModelStep3,
  //   component: SecurityAuditModelStep3Component
  // },
  // {
  //   path: ReportsRoutes.securityAuditFormNotes,
  //   component: SecurityAuditFormNotesComponent
  // },
  // {
  //   path: ReportsRoutes.securityAuditPhotos,
  //   component: SecurityAuditPhotosComponent
  // },
  
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ReportsRoutingModule { }
