import {      NgModule    } from '@angular/core';
import { MessageService } from 'primeng/api';
import { DropdownModule } from 'primeng/dropdown';
import { ToastModule } from 'primeng/toast';
import { SidebarModule } from 'primeng/sidebar';
import { AvatarModule } from 'primeng/avatar';
import { AvatarGroupModule } from 'primeng/avatargroup';
import { ImageModule } from 'primeng/image';
import { MultiSelectModule } from 'primeng/multiselect';
import { InputSwitchModule } from 'primeng/inputswitch';
import { OverlayPanelModule } from 'primeng/overlaypanel';
import { InputMaskModule } from 'primeng/inputmask';
import { GalleriaModule } from 'primeng/galleria';

const elements = [
  ToastModule,
  DropdownModule,
  SidebarModule,
  AvatarModule,
  AvatarGroupModule,
  ImageModule,
  MultiSelectModule,
  InputSwitchModule,
  OverlayPanelModule,
  InputMaskModule,
  GalleriaModule,
];

@NgModule({
  imports: [elements],
      
  exports: [elements],
  providers: [MessageService],
})
export class PrimeNgModule {}
