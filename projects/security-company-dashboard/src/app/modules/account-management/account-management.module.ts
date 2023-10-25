import {      NgModule    } from '@angular/core';
import { CoreModule } from '../core/core.module';
import { AccountManagementRoutingModule } from './account-management.routing.module';
import { AccountComponent } from './components/account/account.component';

@NgModule({
  declarations: [AccountComponent],
      
  imports: [CoreModule, AccountManagementRoutingModule],
})
export class AccountManagementModule {}
