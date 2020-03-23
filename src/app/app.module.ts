import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { IonicStorageModule } from '@ionic/storage';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

import { AngularFireModule } from 'angularfire2';
import { environment } from '../environments/environment';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { AngularFireAuth } from '@angular/fire/auth';
import { GroupInfoPipe } from './group-info.pipe';
import { GroupInfoPage } from './group-info/group-info.page';
import { RubricPage } from './home/rubric/rubric.page';
import { RubricPageModule } from './home/rubric/rubric.module';
import {NgxQRCodeModule } from 'ngx-qrcode2';
 import {BarcodeScanner} from '@ionic-native/barcode-scanner/ngx';
import { FeedbackPipe } from './feedback.pipe'

@NgModule({
  declarations: [AppComponent, GroupInfoPipe, FeedbackPipe],
  entryComponents: [],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    IonicStorageModule.forRoot(),
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    RubricPageModule,
    NgxQRCodeModule
    
    
  ],
  providers: [
    StatusBar,
    SplashScreen,
    AngularFireAuth,
    BarcodeScanner,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy ,},
    ],
  bootstrap: [AppComponent]
})
export class AppModule {}
