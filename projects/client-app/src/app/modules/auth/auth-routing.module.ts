import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Roles } from 'projects/tools/src/public-api';
import { AuthComponent } from './auth.component';
import { AccountTypeComponent } from './components/account-type/account-type.component';
import { LoginComponent } from './components/login/login.component';
import { OtpComponent } from './components/otp/otp.component';
import { RegisterFacilityComponent } from './components/register-facility/register-facility.component';
import { RegisterFacilityResolver } from './components/register-facility/register-facility.resolver';
import { RegisterNumberComponent } from './components/register-number/register-number.component';
import { RegisterComponent } from './components/register/register.component';
import { RegisterResolver } from './components/register/register.resolver';
import { AuthGuard } from './guards/auth.guard';
import { SafetyGuard } from './guards/safety.guard';
import { AuthRoutes } from './routes/auth-routes.enum';
import { HomeGuard } from './guards/guards/home.guard';

const routes: Routes = [
  {
    path: '',
    component: AuthComponent,
    canActivate: [SafetyGuard],
    children: [
      { path: '', redirectTo: 'login', pathMatch: 'full' },
      { path: AuthRoutes.accountType, component: AccountTypeComponent },
      { path: AuthRoutes.login, component: LoginComponent },
      {
        path: AuthRoutes.otp + '/:type' + '/:phone',
        component: OtpComponent,
        data: {
          allowedRoles: [
            Roles.Company,
            Roles.SecurityGurd,
            Roles.ClientCompanyUser,
          ],
        },
      },
      {
        path: AuthRoutes.registerNumber + '/:type',
        component: RegisterNumberComponent,
      },
      {
        path: AuthRoutes.register,
        component: RegisterComponent,
        resolve: { lookup: RegisterResolver },
        canActivate: [AuthGuard],
      },
      {
        path: AuthRoutes.facility,
        component: RegisterFacilityComponent,
        resolve: { lookup: RegisterFacilityResolver },
        canActivate: [AuthGuard],
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AuthRoutesModule {}
