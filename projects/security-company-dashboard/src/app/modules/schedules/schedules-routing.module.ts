import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ClientsResolver } from '../client/components/clients-list/clients.resolver';
import { CompanyShiftComponent } from './components/company-shift/company-shift.component';
import { CompanyShiftsResolver } from './components/company-shift/company-shifts.resolver';
import { SchedulesRoutes } from './routes/schedules-routes.enum';

const routes: Routes = [
  { path: '', redirectTo: SchedulesRoutes.companyShifts, pathMatch: 'full' },
  {
    path: SchedulesRoutes.companyShifts,
    component: CompanyShiftComponent,
    resolve: {
      initData: CompanyShiftsResolver,
    },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SchedulesRoutingModule {}
