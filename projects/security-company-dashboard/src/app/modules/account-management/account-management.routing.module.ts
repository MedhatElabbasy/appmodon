import { PersonalDetailsResolver } from './../auth/components/personal-details/personal-details.resolver';
import { CountriesResolver } from './../../../../../tools/src/lib/countries.resolver';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AccountComponent } from './components/account/account.component';
import { AccountRoutes } from './routes/account-routes.enum';
import { LookupService } from 'projects/tools/src/public-api';

const routes: Routes = [
  {
    path: AccountRoutes.managementAccount,
    component: AccountComponent,
    resolve: {
      codes: CountriesResolver,
      initData: PersonalDetailsResolver,
    },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AccountManagementRoutingModule {}
