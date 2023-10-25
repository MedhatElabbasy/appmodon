import {      NgModule    } from '@angular/core';

import { BranchesRoutingModule } from './branches-routing.module';
import { BranchesComponent } from './branches.component';
import { BranchesGridComponent } from './components/branches-grid/branches-grid.component';
import { CoreModule } from '../core/core.module';
import { BranchCardComponent } from './components/branch-card/branch-card.component';
import { BranchUsersComponent } from './components/branch-users/branch-users.component';

@NgModule({
  declarations: [
    BranchesComponent,
    BranchesGridComponent,
    BranchCardComponent,
    BranchUsersComponent,
  ],
      
  imports: [CoreModule, BranchesRoutingModule],
})
export class BranchesModule {}
