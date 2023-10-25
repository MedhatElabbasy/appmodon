import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LocationRoutes } from './routes/location-routes';
import { LocationComponent } from './components/location/location.component';
import { AllBranchesComponent } from './components/all-branches/all-branches.component';

const routes: Routes = [
  { path: '', redirectTo: LocationRoutes.location, pathMatch: 'full' },
  {
    path: LocationRoutes.location,
    component: LocationComponent
  },
  {
    path: LocationRoutes.allBranches + '/:id',
    component: AllBranchesComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LocationsRoutingModule { }
