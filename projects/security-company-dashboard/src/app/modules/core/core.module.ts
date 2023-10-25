import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import {
  FormsModule,
  NG_VALIDATORS,
  ReactiveFormsModule,
} from '@angular/forms';
import { GoogleMapsModule } from '@angular/google-maps';
import { AngularSvgIconModule } from 'angular-svg-icon';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import {
  HttpClient,
  HttpClientModule,
  HTTP_INTERCEPTORS,
} from '@angular/common/http';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { LoaderInterceptor } from './interceptors/loader.interceptor';
import { ErrorInterceptor } from './interceptors/error.interceptor';
import { PrimeNgModule, ToolsModule } from 'projects/tools/src/public-api';
import { environment } from 'projects/security-company-dashboard/src/environments/environment';

import { DashboardLayoutComponent } from './components/dashboard-layout/dashboard-layout.component';

import { AddButtonComponent } from './components/add-button/add-button.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { RejectedComponent } from './components/rejected/rejected.component';
import { ApprovedComponent } from './components/approved/approved.component';
import { IonicModule } from '@ionic/angular';
import { PendingComponent } from './components/pending/pending.component';
import { NgOtpInputModule } from 'ng-otp-input';
import { AuthInterceptor } from '../auth/interceptor/auth.interceptor';
import { RoleDirective } from './directives/role.directive';
import { NotActiveComponent } from './components/not-active/not-active.component';
import { TabLayoutComponent } from './components/tab-layout/tab-layout.component';
import { OverlayModule } from '@angular/cdk/overlay';
import { TimePipe } from './pipes/time.pipe';
import { LineAddButtonComponent } from './components/line-add-button/line-add-button.component';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { TimeDetailsPipe } from './pipes/time-details.pipe';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { DashGuardCardComponent } from './components/dashboard/components/dash-guard-card/dash-guard-card.component';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { BorderTitleComponent } from './components/border-title/border-title.component';
import { SanitizerPipe } from './pipes/sanitizer.pipe';

const declarations: any = [
  SanitizerPipe,
  DashboardLayoutComponent,
  AddButtonComponent,
  RejectedComponent,
  ApprovedComponent,
  PendingComponent,
  RoleDirective,
  TabLayoutComponent,
  NotActiveComponent,
  TimePipe,
  LineAddButtonComponent,
  TimeDetailsPipe,
  AddButtonComponent,
  DashboardComponent,
  DashGuardCardComponent,
  BorderTitleComponent,
];

const ref = [
  CommonModule,
  RouterModule,
  ReactiveFormsModule,
  FormsModule,
  GoogleMapsModule,
  AngularSvgIconModule.forRoot(),
  HttpClientModule,
  TranslateModule.forChild({
    loader: {
      provide: TranslateLoader,
      useFactory: SecurityCompanyLoaderFactory,
      deps: [HttpClient],
    },
  }),
  BsDatepickerModule.forRoot(),
  PrimeNgModule,
  ToolsModule.forRoot(environment),
  IonicModule,
  NgxPaginationModule,
  ReactiveFormsModule,
  FormsModule,
  NgOtpInputModule,
  NgxPaginationModule,
  OverlayModule,
  CarouselModule,
  Ng2SearchPipeModule,
];

@NgModule({
  declarations: [declarations, SanitizerPipe],

  imports: [ref],
  exports: [declarations, ref],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: LoaderInterceptor,
      multi: true,
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ErrorInterceptor,
      multi: true,
    },
  ],
})
export class CoreModule { }

export function SecurityCompanyLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}
