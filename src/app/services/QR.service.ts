import { AngularFirestore } from 'angularfire2/firestore';
import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
@Injectable({
    providedIn: 'root'
  })
  export class QRService
   {
      email:string;
    constructor(public firestore: AngularFirestore,public storage:Storage) {
        console.log("in qrservice")
      this.storage.get('email').then((val) => {
          this.email = val;
          console.log(this.email);
          
        });
    }
    createQR()
    {

    }
    scanQR()
    {
        
    }
    
  }
  