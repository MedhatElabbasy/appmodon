import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ShiftsComponent } from './components/shifts/shifts.component';
import { ShiftsResolver } from './components/shifts/shifts.resolver';
import {
  EmergencyContactRoutes,
  managmentRoutes,
  SettingsRoutes,
} from './routes/settings-routes.enum';
import { ManageGuardToolsComponent } from './components/manage-guard-tools/manage-guard-tools.component';
import { DetailsManageComponent } from './components/details-manage/details-manage.component';
import { ManagGuardToolsResolver } from './components/manage-guard-tools/manag-guard-tools.resolver';
import { EmergencyContactComponent } from './components/emergency-contact/emergency-contact.component';
import { EmergencyContactListComponent } from './components/emergency-contact-list/emergency-contact-list.component';

const routes: Routes = [
  {
    path: SettingsRoutes.shifts,
    component: ShiftsComponent,
    resolve: {
      initData: ShiftsResolver,
    },
  },
  {
    path: SettingsRoutes.managment,
    component: ManageGuardToolsComponent,
    resolve: {
      guards: ManagGuardToolsResolver,
    },
    children: [
      {
        path: '',
        redirectTo: managmentRoutes.managementList,
        pathMatch: 'full',
      },
      {
        path: managmentRoutes.managementList,
        component: DetailsManageComponent,
      },
    ],
  },
  {
    path: SettingsRoutes.EmergencyContact,
    component: EmergencyContactComponent,
    /*resolve: {
      initData: ShiftsResolver,
    },*/
    children: [
      {
        path: '',
        redirectTo: EmergencyContactRoutes.EmergencyContactList,
        pathMatch: 'full',
      },
      {
        path: EmergencyContactRoutes.EmergencyContactList,
        component: EmergencyContactListComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SettingsRoutingModule {}
