import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BranchesComponent } from './branches.component';
import { BranchUsersComponent } from './components/branch-users/branch-users.component';
import { BranchUsersResolver } from './components/branch-users/branch-users.resolver';
import { BranchesGridComponent } from './components/branches-grid/branches-grid.component';
import { BranchesResolver } from './components/branches-grid/branches.resolver';
import { BranchesRoutes } from './routes/branches-routes.enum';

const routes: Routes = [
  {
    path: '',
    component: BranchesComponent,
    children: [
      {
        path: '',
        redirectTo: BranchesRoutes.manageBranches,
        pathMatch: 'full',
      },
      {
        path: BranchesRoutes.manageBranches,
        component: BranchesGridComponent,
        resolve: {
          branches: BranchesResolver,
        },
      },
      {
        path: BranchesRoutes.branchUsers + '/:id',
        component: BranchUsersComponent,
        resolve: {
          initData: BranchUsersResolver,
        },
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BranchesRoutingModule {}
