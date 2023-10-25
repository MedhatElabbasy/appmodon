import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Routing } from '../core/routes/app-routes';
import { InfractionDetailsComponent } from './components/infraction-details/infraction-details.component';
import { LookupsComponent } from './components/lookups/lookups.component';
import { MonitoringComplaintsComponent } from './components/monitoring-complaints/monitoring-complaints.component';
import { LookupsRoutes } from './routes/lookup-routes';

const routes: Routes = [
  { path:'',redirectTo:LookupsRoutes.MonitoringComplaints ,pathMatch: 'full'},
  {
    path: LookupsRoutes.MonitoringComplaints,
    component: MonitoringComplaintsComponent,

  },
  {
    path:`${LookupsRoutes.MonitoringComplaints}/${LookupsRoutes.infractionDetails}`,
    component: InfractionDetailsComponent,
  }
];
/* {
    path: LookupsRoutes.infractionDetails + '/:id',
    component: InfractionDetailsComponent,
  },
  {
    path: LookupsRoutes.MonitoringComplaints,
    component: MonitoringComplaintsComponent,
  },*/

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LookupsRoutingModule {}
