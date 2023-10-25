import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Roles } from 'projects/tools/src/public-api';

import { RoleGuard } from '../core/guards/role.guard';
import { Routing } from '../core/routes/app-routes';
import { ClientProfileComponent } from './components/client-profile/client-profile.component';
import { ClientResolver } from './components/client-profile/client.resolver';
import { GuardProfileComponent } from './components/guard-profile/guard-profile.component';
import { GuardResolver } from './components/guard-profile/guard.resolver';
import { RequestQuotaResolver } from './components/security-company/components/request-quote/request-quota.resolver';
import { SecurityCompanyComponent } from './components/security-company/security-company.component';
import { ProfileRoutes } from './routes/profile-routes.enum';

const routes: Routes = [
  {
    path: ProfileRoutes.clientProfile,
    component: ClientProfileComponent,
    resolve: { lookup: ClientResolver },
    canActivate: [RoleGuard],
    data: {
      allowedRoles: [Roles.Company, Roles.ClientCompanyUser],
    },
    children: [
      {
        path: '',
        redirectTo: Routing.client.module,
        pathMatch: 'full',
      },
      {
        path: Routing.client.module,
        loadChildren: () =>
          import('../client/client.module').then((m) => m.ClientModule),
      },
    ],
  },
  {
    path: ProfileRoutes.guardProfile,
    component: GuardProfileComponent,
    resolve: { lookup: GuardResolver },
    canActivate: [RoleGuard],
    data: {
      allowedRoles: [Roles.SecurityGurd],
    },
  },
  {
    path: ProfileRoutes.securityCompany + '/:id',
    component: SecurityCompanyComponent,
    resolve: {
      init: RequestQuotaResolver,
    },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProfileRoutingModule {}
