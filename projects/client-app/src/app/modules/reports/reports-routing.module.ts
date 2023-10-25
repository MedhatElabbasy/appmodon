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
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ReportsRoutingModule { }
