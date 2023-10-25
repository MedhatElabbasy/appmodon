import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {
  ForbiddenComponent,
  NotFoundComponent,
  UnauthorizedComponent,
  UnderConstructionComponent,
} from 'projects/tools/src/public-api';
import { AuthGuard } from './modules/auth/guards/auth.guard';
import { IdentityGuard } from './modules/auth/guards/identity.guard';
import { ApprovedComponent } from './modules/core/components/approved/approved.component';
import { DashboardLayoutComponent } from './modules/core/components/dashboard-layout/dashboard-layout.component';
import { DashboardResolver } from './modules/core/components/dashboard-layout/dashboard.resolver';
import { DashResolver } from './modules/core/components/dashboard/components/dash.resolver';
import { DashboardComponent } from './modules/core/components/dashboard/dashboard.component';
import { NotActiveComponent } from './modules/core/components/not-active/not-active.component';
import { PendingComponent } from './modules/core/components/pending/pending.component';
import { RejectedComponent } from './modules/core/components/rejected/rejected.component';
import { SecurityCompanyResolver } from './modules/core/resolvers/security-company.resolver';
import { Routing } from './modules/core/routes/app-routes';

const routes: Routes = [
  { path: '', redirectTo: Routing.auth.module, pathMatch: 'full' },
  {
    path: Routing.dashboard,
    component: DashboardLayoutComponent,
    canActivate: [AuthGuard, IdentityGuard],
    resolve: {
      company: DashboardResolver,
    },
    children: [
      { path: '', redirectTo: Routing.reports.module, pathMatch: 'full' },
      {
        path: Routing.statics,
        component: DashboardComponent,
        resolve: {
          report: DashResolver,
        },
      },
      {
        path: Routing.jobs.module,
        loadChildren: () =>
          import('./modules/jobs/jobs.module').then((m) => m.JobsModule),
      },
      {
        path: Routing.agents.module,
        loadChildren: () =>
          import('./modules/agent/agent.module').then((m) => m.AgentModule),
      },
      {
        path: Routing.clients.module,
        loadChildren: () =>
          import('./modules/client/client.module').then((m) => m.ClientModule),
      },
      {
        path: Routing.account.module,
        loadChildren: () =>
          import('./modules/account-management/account-management.module').then(
            (m) => m.AccountManagementModule
          ),
      },
      {
        path: Routing.lookups.module,
        loadChildren: () =>
          import('./modules/lookups/lookups.module').then(
            (m) => m.LookupsModule
          ),
      },
      {
        path: Routing.branches.module,
        loadChildren: () =>
          import('./modules/branches/branches.module').then(
            (m) => m.BranchesModule
          ),
      },
      {
        path: Routing.contracts.module,
        loadChildren: () =>
          import('./modules/contracts/contracts.module').then(
            (m) => m.ContractsModule
          ),
      },
      {
        path: Routing.settings.module,
        loadChildren: () =>
          import('./modules/settings/settings.module').then(
            (m) => m.SettingsModule
          ),
      },
      {
        path: Routing.schedules.module,
        loadChildren: () =>
          import('./modules/schedules/schedules.module').then(
            (m) => m.SchedulesModule
          ),
      },
      {
        path: Routing.reports.module,
        loadChildren: () =>
          import('./modules/reports/reports.module').then(
            (m) => m.ReportsModule
          ),
      },
      {
        path: Routing.guards.module,
        loadChildren: () =>
          import('./modules/guards/guards.module').then((m) => m.GuardsModule),
      },
    ],
  },
  {
    path: Routing.auth.module,
    loadChildren: () =>
      import('./modules/auth/auth.module').then((m) => m.AuthModule),
  },
  /* ------------------------------ static pages ------------------------------ */
  {
    path: Routing.pending,
    component: PendingComponent,
    canActivate: [AuthGuard],
    resolve: {
      data: SecurityCompanyResolver,
    },
  },
  {
    path: Routing.rejected,
    component: RejectedComponent,
    canActivate: [AuthGuard],
    resolve: {
      data: SecurityCompanyResolver,
    },
  },
  {
    path: Routing.notActive,
    component: NotActiveComponent,
    canActivate: [AuthGuard],
    resolve: {
      data: SecurityCompanyResolver,
    },
  },
  {
    path: Routing.approved,
    component: ApprovedComponent,
    canActivate: [AuthGuard],
    resolve: {
      data: SecurityCompanyResolver,
    },
  },
  {
    path: Routing.unauthorized,
    component: UnauthorizedComponent,
  },
  {
    path: Routing.underConstruction,
    component: UnderConstructionComponent,
  },
  {
    path: Routing.notFound,
    component: NotFoundComponent,
  },
  {
    path: Routing.forbidden,
    component: ForbiddenComponent,
  },

  /* -------------------------------- wild card ------------------------------- */
  {
    path: '**',
    redirectTo: Routing.notFound,
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      useHash: true,
      scrollPositionRestoration: 'enabled',
    }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
