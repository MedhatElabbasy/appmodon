import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ClientComponent } from './client.component';
import { ApprovedRequestsComponent } from './components/approved-requests/approved-requests.component';
import { ApprovedRequestsResolver } from './components/approved-requests/approved-requests.resolver';
import { ClientDetailsComponent } from './components/client-details/client-details.component';
import { ClientDetailsResolver } from './components/client-details/client-details.resolver';
import { ClientBankDetailsComponent } from './components/client-details/components/client-bank-details/client-bank-details.component';
import { ClientGuardsComponent } from './components/client-details/components/client-guards/client-guards.component';
import { ClientGuardsResolver } from './components/client-details/components/client-guards/client-guards.resolver';
import { LocationGuardsComponent } from './components/client-details/components/client-guards/components/location-guards/location-guards.component';
import { LocationGuardsResolver } from './components/client-details/components/client-guards/components/location-guards/location-guards.resolver';
import { ClientSiteResolver } from './components/client-details/components/client-sites/client-site.resolver';
import { ClientSitesComponent } from './components/client-details/components/client-sites/client-sites.component';
import { GeneralDetailsComponent } from './components/client-details/components/general-details/general-details.component';
import { SiteDetailsComponent } from './components/client-details/components/site-details/site-details.component';
import { SiteDetailsResolver } from './components/client-details/components/site-details/site-details.resolver';
import { ClientsListComponent } from './components/clients-list/clients-list.component';
import { ClientsResolver } from './components/clients-list/clients.resolver';
import { NewRequestsComponent } from './components/new-requests/new-requests.component';
import { NewRequestsResolver } from './components/new-requests/new-requests.resolver';
import { ClientsRoutes } from './routes/clients-routes.enum';

const routes: Routes = [
  {
    path: '',
    component: ClientComponent,
    children: [
      { path: '', redirectTo: ClientsRoutes.clientsList, pathMatch: 'full' },
      {
        path: ClientsRoutes.clientsList,
        component: ClientsListComponent,
        resolve: {
          clients: ClientsResolver,
        },
      },
      {
        path: ClientsRoutes.newRequests,
        component: NewRequestsComponent,

        resolve: {
          orders: NewRequestsResolver,
        },
      },
      {
        path: ClientsRoutes.approvedRequests,
        component: ApprovedRequestsComponent,
        resolve: {
          orders: ApprovedRequestsResolver,
        },
      },
    ],
  },
  {
    path: ClientsRoutes.clientDetails + '/:id' + '/:clientId',
    component: ClientDetailsComponent,
    resolve: {
      client: ClientDetailsResolver,
    },
    children: [
      {
        path: '',
        redirectTo: ClientsRoutes.generalDetails,
        pathMatch: 'full',
      },
      {
        path: ClientsRoutes.generalDetails,
        component: GeneralDetailsComponent,
      },
      {
        path: ClientsRoutes.bankDetails,
        component: ClientBankDetailsComponent,
      },
      {
        path: ClientsRoutes.sites,
        component: ClientSitesComponent,
        resolve: {
          initData: ClientSiteResolver,
        },
      },
      {
        path: ClientsRoutes.guards,
        component: ClientGuardsComponent,
        resolve: {
          sites: ClientGuardsResolver,
        },
        children: [
          {
            path: ClientsRoutes.locationGuards + '/:locationId' + '/:guards',
            component: LocationGuardsComponent,
            resolve: {
              initData: LocationGuardsResolver,
            },
          },
        ],
      },
      {
        path: ClientsRoutes.siteDetails + '/:siteId',
        component: SiteDetailsComponent,
        resolve: {
          initData: SiteDetailsResolver,
        },
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ClientRoutingModule {}
