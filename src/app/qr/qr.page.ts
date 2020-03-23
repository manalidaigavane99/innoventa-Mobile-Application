import { Component, OnInit } from '@angular/core';
import { QRService } from '../services/QR.service';
import { Storage } from '@ionic/storage';
import { GroupsService } from '../services/groups.service';
import {NgxQRCodeModule } from 'ngx-qrcode2';
import { FirestoreService } from '../services/firestore.service';
@Component({
  selector: 'app-qr',
  templateUrl: './qr.page.html',
  styleUrls: ['./qr.page.scss'],
})
export class QRPage implements OnInit {
  
  qrdata:string;
  email:string;
  isdone=false;
  index=-1;
  groupId:number;
  c1:number;
  c2=null;
  group:any;
  constructor(private qr:QRService,private gs:GroupsService,public storage:Storage,private fs:FirestoreService){ 
    console.log("in qr constructor")
    this.storage.get('email').then((val)=>{
        this.email=val;
    });
    this.storage.get('groupId').then((val)=>{
      this.groupId=val;
    })
    this.storage.get('index').then((val)=>{
      this.index=val;
     });
  }

  ngOnInit() {
  }
  createQR()
  { 
    console.log("in create Qr");
    console.log(this.email);
   
   console.log("groupid: "+this.groupId)
    this.qrdata=this.groupId+"group"+this.index;
    this.isdone=true;
    this.index++;
    this.fs.updateIndex(this.index,this.groupId);
  setTimeout(()=>{    
    
  this.isdone=false;
   
}, 1000);
   
  
  }
  scanQR()
  {

  }
  clear()
  {
    this.isdone=false;
  }
}
