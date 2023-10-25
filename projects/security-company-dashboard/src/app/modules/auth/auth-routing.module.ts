import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { Roles } from 'projects/tools/src/public-api';
import { AuthLayoutComponent } from './components/auth-layout/auth-layout.component';
import { AuthWrapperComponent } from './components/auth-wrapper/auth-wrapper.component';
import { BankDetailsComponent } from './components/bank-details/bank-details.component';
import { CompanyDetailsComponent } from './components/company-details/company-details.component';
import { CompanyDetailsResolver } from './components/company-details/company-details.resolver';
import { LoginComponent } from './components/login/login.component';
import { OtherDetailsComponent } from './components/other-details/other-details.component';
import { OtherDetailsResolver } from './components/other-details/other-details.resolver';
import { OtpComponent } from './components/otp/otp.component';
import { PersonalDetailsComponent } from './components/personal-details/personal-details.component';
import { PersonalDetailsResolver } from './components/personal-details/personal-details.resolver';
import { RegisterNumberComponent } from './components/register-number/register-number.component';
import { CompanyRegisterForm, getFirstStep } from './components/register/form';
import { RegisterComponent } from './components/register/register.component';
import { AuthGuard } from './guards/auth.guard';
import { IdentityGuard } from './guards/identity.guard';
import { SafetyGuard } from './guards/safety.guard';
import { AuthRoutes } from './routes/auth-routes.enum';

const Form = CompanyRegisterForm;

const routes: Routes = [
  {
    path: '',
    component: AuthWrapperComponent,
    canActivate: [SafetyGuard],
    children: [
      {
        path: '',
        component: AuthLayoutComponent,
        children: [
          { path: '', redirectTo: AuthRoutes.login, pathMatch: 'full' },
          { path: AuthRoutes.login, component: LoginComponent },
          {
            path: AuthRoutes.otp + '/:type' + '/:phone',
            component: OtpComponent,
            data: {
              allowedRoles: [Roles.SecuritCompany, Roles.SecurityCompanyUser],
            },
          },
          {
            path: AuthRoutes.registerNumber,
            component: RegisterNumberComponent,
          },
        ],
      },
      {
        path: AuthRoutes.register,
        component: RegisterComponent,
        canActivate: [AuthGuard],
        children: [
          {
            path: '',
            redirectTo: getFirstStep(Form).path,
            pathMatch: 'full',
          },
          {
            path: Form.personalDetails.path,
            component: PersonalDetailsComponent,
            data: {
              order: Form.personalDetails.order,
            },
            resolve: {
              initData: PersonalDetailsResolver,
            },
          },
          {
            path: Form.companyDetails.path,
            component: CompanyDetailsComponent,
            data: {
              order: Form.companyDetails.order,
            },
            resolve: {
              initData: CompanyDetailsResolver,
            },
          },
          {
            path: Form.otherDetails.path,
            component: OtherDetailsComponent,
            data: {
              order: Form.otherDetails.order,
            },
            resolve: {
              initData: OtherDetailsResolver,
            },
          },
          {
            path: Form.bankDetails.path,
            component: BankDetailsComponent,
            data: {
              order: Form.bankDetails.order,
            },
          },
        ],
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [],
})
export class AuthRoutingModule {}
