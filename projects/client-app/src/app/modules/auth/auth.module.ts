import {      NgModule    } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthRoutesModule } from './auth-routing.module';
import { AuthComponent } from './auth.component';
import { LoginComponent } from './components/login/login.component';
import { AccountTypeComponent } from './components/account-type/account-type.component';
import { OtpComponent } from './components/otp/otp.component';
import { RegisterFacilityComponent } from './components/register-facility/register-facility.component';

import { RegisterNumberComponent } from './components/register-number/register-number.component';
import { RegisterComponent } from './components/register/register.component';

import { CoreModule } from '../core/core.module';

@NgModule({
  declarations: [
    AuthComponent,
    LoginComponent,
    AccountTypeComponent,
    OtpComponent,
    RegisterComponent,
    RegisterFacilityComponent,
    RegisterNumberComponent,
  ],
      
  imports: [CoreModule, AuthRoutesModule],
})
export class AuthModule {}
