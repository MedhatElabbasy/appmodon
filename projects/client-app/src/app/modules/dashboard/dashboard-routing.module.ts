import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { dashboardRoutes } from './routes/dashboard-routes.enum';

const routes: Routes = [
  {
    path: '',
    redirectTo: dashboardRoutes.dashboad,
    pathMatch: 'full',
  },
  {
    path: dashboardRoutes.dashboad,
    component: DashboardComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
