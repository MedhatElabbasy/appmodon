import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GuardEquipmentComponent } from './components/guards-details/components/guard-equipment/guard-equipment.component';
import { GuardGeneralDetailsComponent } from './components/guards-details/components/guard-general-details/guard-general-details.component';
import { GuardLeavesComponent } from './components/guards-details/components/guard-leaves/guard-leaves.component';
import { GuardLeavesResolver } from './components/guards-details/components/guard-leaves/guard-leaves.resolver';
import { GuardSiteComponent } from './components/guards-details/components/guard-site/guard-site.component';
import { GuardSiteResolver } from './components/guards-details/components/guard-site/guard-site.resolver';
import { GuardsDetailsComponent } from './components/guards-details/guards-details.component';
import { GuardsListComponent } from './components/guards-list/guards-list.component';
import { GuardsListResolver } from './components/guards-list/guards-list.resolver';
import { SupervisorsListComponent } from './components/supervisors-list/supervisors-list.component';
import { SupervisorsListResolver } from './components/supervisors-list/supervisors-list.resolver';
import { GuardsComponent } from './guards.component';
import { GuardsRoutes } from './routes/guards-routes.enum';

const routes: Routes = [
  {
    path: '',
    component: GuardsComponent,
    children: [
      { path: '', redirectTo: GuardsRoutes.guardsList, pathMatch: 'full' },
      {
        path: GuardsRoutes.guardsList,
        component: GuardsListComponent,
        resolve: {
          guards: GuardsListResolver,
        },
      },
      {
        path: GuardsRoutes.supervisorsList,
        component: SupervisorsListComponent,
        resolve: {
          guards: SupervisorsListResolver,
        },
      },
    ],
  },
  {
    path: GuardsRoutes.userDetails + '/:guard',
    component: GuardsDetailsComponent,
    children: [
      { path: '', redirectTo: GuardsRoutes.generalDetails, pathMatch: 'full' },
      {
        path: GuardsRoutes.generalDetails,
        component: GuardGeneralDetailsComponent,
      },
      {
        path: GuardsRoutes.sites,
        component: GuardSiteComponent,
        resolve: {
          sites: GuardSiteResolver,
        },
      },
      {
        path: GuardsRoutes.userLeaves,
        component: GuardLeavesComponent,
        resolve: {
          leaves: GuardLeavesResolver,
        },
      },
      {
        path: GuardsRoutes.equipment,
        component: GuardEquipmentComponent,
        resolve: {
         // leaves: GuardLeavesResolver,
        },
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class GuardsRoutingModule {}
