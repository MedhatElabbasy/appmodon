import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CompleteComponent } from './components/complete/complete.component';
import { completeProfileRoutes } from './routes/completeProfile';
const routes: Routes = [
  {
    path: '',
    redirectTo: completeProfileRoutes.completeProfile,
    pathMatch: 'full',
  },
  {
    path: completeProfileRoutes.completeProfile,
    component: CompleteComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],

  exports: [RouterModule],
})
export class CompleteProfileRoutingModule {}