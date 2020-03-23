import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DisplayPageRoutingModule } from './display-routing.module';
import { DisplayPage } from './display.Page';
import { BarcodeScanner } from '@ionic-native/barcode-scanner';



@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DisplayPageRoutingModule,
  ],
  declarations: [DisplayPage],
  providers:[]
})
export class DisplayPageModule {}
