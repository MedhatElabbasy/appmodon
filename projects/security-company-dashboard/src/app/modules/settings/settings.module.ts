import {      NgModule    } from '@angular/core';
import { SettingsRoutingModule } from './settings-routing.module';
import { ShiftsComponent } from './components/shifts/shifts.component';
import { CoreModule } from '../core/core.module';
import { ShiftCardComponent } from './components/shifts/components/shift-card/shift-card.component';
import { ManageGuardToolsComponent } from './components/manage-guard-tools/manage-guard-tools.component';
import { DetailsManageComponent } from './components/details-manage/details-manage.component';
import { EmergencyContactComponent } from './components/emergency-contact/emergency-contact.component';
import { EmergencyContactListComponent } from './components/emergency-contact-list/emergency-contact-list.component';
import { ContantCardComponent } from './components/contant-card/contant-card.component';

@NgModule({
  declarations: [ShiftsComponent, ShiftCardComponent, ManageGuardToolsComponent, DetailsManageComponent, EmergencyContactComponent, EmergencyContactListComponent, ContantCardComponent],
      
  imports: [CoreModule, SettingsRoutingModule],
})
export class SettingsModule {}
