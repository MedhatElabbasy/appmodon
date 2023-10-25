import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import {      ModuleWithProviders, NgModule    } from '@angular/core';
import { GoogleMapsModule } from '@angular/google-maps';
import { CanvasComponent } from './components/canvas/canvas.component';
import { LoaderComponent } from './components/loader/loader.component';
import { MapSearchComponent } from './components/map-search/map-search.component';
import { ModalComponent } from './components/modal/modal.component';
import { UrlPipe } from './pipes/url.pipe';
import { PrimeNgModule } from './prime-ng.module';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { UnauthorizedComponent } from './components/unauthorized/unauthorized.component';
import { UnderConstructionComponent } from './components/under-construction/under-construction.component';
import { ForbiddenComponent } from './components/forbidden/forbidden.component';
import { RouterModule } from '@angular/router';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { HttpClient } from '@angular/common/http';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { StatusBadgeComponent } from './components/status-badge/status-badge.component';
import { FileUploadComponent } from './components/file-upload/file-upload.component';

const declarations = [
  MapSearchComponent,
  ModalComponent,
  CanvasComponent,
  LoaderComponent,
  UrlPipe,
  NotFoundComponent,
  UnauthorizedComponent,
  UnderConstructionComponent,
  ForbiddenComponent,
  StatusBadgeComponent,
  FileUploadComponent,
];

@NgModule({
  declarations: [declarations],
      
  imports: [
    CommonModule,
    RouterModule,
    GoogleMapsModule,
    PrimeNgModule,
    ReactiveFormsModule,
    TranslateModule.forChild({
      loader: {
        provide: TranslateLoader,
        useFactory: ToolsLoaderFactory,
        deps: [HttpClient],
      },
      isolate: true,
    }),
  ],
  exports: [declarations, PrimeNgModule, TranslateModule],
})
export class ToolsModule {
  public static forRoot(environment: any): ModuleWithProviders<ToolsModule> {
    return {
      ngModule: ToolsModule,
      providers: [
        {
          provide: 'env', // you can also use InjectionToken
          useValue: environment,
        },
      ],
    };
  }
}

function ToolsLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

export function convertDateToString(date: any) {
  return new Date(date)
    .toLocaleString('en-US', {
      day: '2-digit',
      year: 'numeric',
      month: '2-digit',
    })
    .replace('/', '-')
    .replace('/', '-');
}
