import { Component, OnInit } from '@angular/core';
import { QRService } from '../services/QR.service';
import { Storage } from '@ionic/storage';
import { GroupsService } from '../services/groups.service';
import {NgxQRCodeModule } from 'ngx-qrcode2';
@Component({
  selector: 'app-qr',
  templateUrl: './qr.page.html',
  styleUrls: ['./qr.page.scss'],
})
export class QRPage implements OnInit {
  member1:string;
  member2:string;
  member3:string;
  qrdata=new Array<string>(3);
  isdone=false;
  index=-1;
  constructor(private qr:QRService,private gs:GroupsService,public storage:Storage){ 
    console.log("in qr constructor")
    this.storage.get('member1').then((val) => {
      this.member1 = val;
     console.log(this.member1);
      
    });
    this.storage.get('member2').then((val) => {
      this.member2 = val;
     console.log(this.member2);
      
    });
    this.storage.get('member3').then((val) => {
      this.member3 = val;
     console.log(this.member3);
      
    });
    

  }

  ngOnInit() {
  }
  createQR()
  {
    
    this.qrdata[0]=this.member1;
    this.qrdata[1]=this.member2;
    this.qrdata[2]=this.member3;
    this.isdone=true;
    this.index=this.index+1;
    this.index=this.index%3;
    setTimeout(()=>{   
      this.isdone = false;
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
