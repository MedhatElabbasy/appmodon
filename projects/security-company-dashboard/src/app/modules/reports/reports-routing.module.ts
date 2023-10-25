import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AccidentsComponent } from './components/accidents/accidents.component';
import { AccidentsResolver } from './components/accidents/accidents.resolver';
import { AttendanceComponent } from './components/attendance/attendance.component';
import { AttendanceResolver } from './components/attendance/attendance.resolver';
import { VisitorsReportsResolver } from './components/visitors/visitors-reports.resolver';
import { VisitorsComponent } from './components/visitors/visitors.component';
import { ReportsComponent } from './reports.component';
import { ReportsRoutes } from './routes/reports-routes.enum';

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
    resolve: {
      report: AttendanceResolver,
    },
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
  exports: [RouterModule],
})
export class ReportsRoutingModule {}
