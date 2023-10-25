import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { clientGuardRoutes } from './routes/client-gurad';
import { ClientGuardComponent } from './compnents/client-guard/client-guard.component';
import { GuardCardComponent } from './compnents/client-guard/guard-card/guard-card.component';
import { LocationRoutes } from '../locations/routes/location-routes';
import { LocationComponent } from '../locations/components/location/location.component';

const routes: Routes = [
  { path: '', redirectTo: LocationRoutes.location, pathMatch: 'full' },
  {
    path: LocationRoutes.location, component: LocationComponent,
  },
  {
    path: clientGuardRoutes.clientGurad + '/:id',
    component: ClientGuardComponent,
    children: [
          {
            path: clientGuardRoutes.guardCard  + '/:id',
            component: GuardCardComponent,
          }] 
  }
  // { path: clientGuardRoutes.clientGurad+ '/:id',
  //   component: ClientGuardComponent,
  //   children: [
  //     {
  //       path: clientGuardRoutes.guardCard  + '/:id',
  //       component: GuardCardComponent,
  //     }] },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ClientGuardRoutingModule { }
