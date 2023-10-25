import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {
  ForbiddenComponent,
  NotFoundComponent,
  UnauthorizedComponent,
  UnderConstructionComponent,
} from 'projects/tools/src/public-api';
import { InfractionDetailsComponent } from './modules/client/components/infraction-details/infraction-details.component';
import { MonitoringComplaintsComponent } from './modules/client/components/monitoring-complaints/monitoring-complaints.component';
import { FaqsComponent } from './modules/core/components/faqs/faqs.component';
import { JobDetailsComponent } from './modules/core/components/jobs/job-details/job-details.component';
import { JobsComponent } from './modules/core/components/jobs/jobs.component';
import { PostProposalComponent } from './modules/core/components/post-proposal/post-proposal.component';
import { PrivacyPolicyComponent } from './modules/core/components/privacy-policy/privacy-policy.component';
import { TermsConditionsComponent } from './modules/core/components/terms-conditions/terms-conditions.component';
import { SecurityCompaniesResolver } from './modules/core/resolvers/security-companies.resolver';
import { Routing } from './modules/core/routes/app-routes';
import { ChatPageComponent } from './pages/chat-page/chat-page.component';
import { ClientCompaniesComponent } from './pages/client-companies/client-companies.component';
import { CompaniesComponent } from './pages/companies/companies.component';
import { HomeComponent } from './pages/home/home.component';
import { LayoutComponent } from './pages/layout/layout.component';
import { CanDeactivateGuard } from './modules/auth/guards/guards/can-deactivate.guard';
import { SafetyGuard } from './modules/auth/guards/safety.guard';
import { HomeGuard } from './modules/auth/guards/guards/home.guard';
import { AuthGuard } from './modules/auth/guards/auth.guard';

const routes: Routes = [
  /* ------------------------------- main layout ------------------------------ */
  {
    path: '',
    component: LayoutComponent,
    children: [
      {
        path: '',
        redirectTo: Routing.home,
        pathMatch: 'full',
      },
      {
        path: Routing.home,
        component: HomeComponent,
        resolve: {
          companies: SecurityCompaniesResolver,
        },
      },
      {
        path: Routing.jobs,
        component: JobsComponent
      },
      {
        path: Routing.jobDetails + '/:id',
        component: JobDetailsComponent,
      },
      {
        path: Routing.companies,
        component: CompaniesComponent,
        resolve: {
          companies: SecurityCompaniesResolver,
        },
      },
      {
        path: Routing.reports.module,
        loadChildren: () =>
          import('./modules/reports/reports.module').then(
            (m) => m.ReportsModule
          ),
        canActivate: [AuthGuard]
      },
      {
        path: Routing.location.module,
        loadChildren: () =>
          import('./modules/locations/locations.module').then(
            (m) => m.LocationsModule
          ),
        canActivate: [AuthGuard]
      },
      {
        path: Routing.clientGuard.module,
        loadChildren: () =>
          import('./modules/client-guard/client-guard.module').then(
            (m) => m.ClientGuardModule
          ),
        canActivate: [AuthGuard]
      },
      {
        path: Routing.clientCompanies,
        component: ClientCompaniesComponent
      },
      {
        path: Routing.profile.module,
        loadChildren: () =>
          import('./modules/profile/profile.module').then(
            (m) => m.ProfileModule
          ),
        canActivate: [AuthGuard]
      },
      {
        path: Routing.dashboad.module,
        loadChildren: () =>
          import('./modules/dashboard/dashboard.module').then(
            (m) => m.DashboardModule
          ),
        canActivate: [AuthGuard]
      },
      {
        path: Routing.completeProfile.module,
        loadChildren: () =>
          import('./modules/complete-profile/complete-profile.module').then(
            (m) => m.CompleteProfileModule
          ),
        canActivate: [AuthGuard]
      },
      {
        path: Routing.client.module,
        loadChildren: () =>
          import('./modules/client/client.module').then(
            (m) => m.ClientModule
          ),
        canActivate: [AuthGuard]
      },
      {
        path: Routing.infractionDetails,
        component: InfractionDetailsComponent,
        canActivate: [AuthGuard]
      },
      {
        path: Routing.MonitoringComplaints,
        component: MonitoringComplaintsComponent,
        canActivate: [AuthGuard]
      },
    ],
  },
  {
    path: Routing.auth.module,
    loadChildren: () =>
      import('./modules/auth/auth.module').then((m) => m.AuthModule),
  }, {
    path: 'chat',
    component: ChatPageComponent,
    canActivate: [AuthGuard]
  },
  /* ------------------------------ static pages ------------------------------ */
  {
    path: Routing.unauthorized,
    component: UnauthorizedComponent,
  },
  {
    path: Routing.privacyPolicy,
    component: PrivacyPolicyComponent,
  },
  {
    path: Routing.termsConditions,
    component: TermsConditionsComponent,
  },
  {
    path: Routing.postProposal,
    component: PostProposalComponent,
  },
  {
    path: Routing.faqs,
    component: FaqsComponent,
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
      onSameUrlNavigation: 'reload',
    }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule { }
