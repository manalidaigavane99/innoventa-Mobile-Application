import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {NgxQRCodeModule } from 'ngx-qrcode2';
import { IonicModule } from '@ionic/angular';

import { QRPageRoutingModule } from './qr-routing.module';

import { QRPage } from './qr.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    QRPageRoutingModule,
    NgxQRCodeModule
  ],
  declarations: [QRPage]
})
export class QRPageModule {}
