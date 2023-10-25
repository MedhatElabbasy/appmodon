import {      NgModule    } from '@angular/core';
import { CoreModule } from '../core/core.module';
import { AuthRoutingModule } from './auth-routing.module';

import { RegisterComponent } from './components/register/register.component';
import { PersonalDetailsComponent } from './components/personal-details/personal-details.component';
import { CompanyDetailsComponent } from './components/company-details/company-details.component';
import { OtherDetailsComponent } from './components/other-details/other-details.component';
import { BankDetailsComponent } from './components/bank-details/bank-details.component';
import { LoginComponent } from './components/login/login.component';
import { AuthLayoutComponent } from './components/auth-layout/auth-layout.component';
import { RegisterNumberComponent } from './components/register-number/register-number.component';
import { OtpComponent } from './components/otp/otp.component';
import { AuthWrapperComponent } from './components/auth-wrapper/auth-wrapper.component';

@NgModule({
  declarations: [
    RegisterComponent,
    PersonalDetailsComponent,
    CompanyDetailsComponent,
    OtherDetailsComponent,
    BankDetailsComponent,
    LoginComponent,
    AuthLayoutComponent,
    RegisterNumberComponent,
    OtpComponent,
    AuthWrapperComponent,
  ],
      
  imports: [CoreModule, AuthRoutingModule],
})
export class AuthModule {}
