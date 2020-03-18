import { Component, OnInit } from '@angular/core';
import { QRService } from '../services/QR.service';
import { Storage } from '@ionic/storage';
import { GroupsService } from '../services/groups.service';

import { UsersService } from '../services/usersService.service';
import { BarcodeScanner } from '@ionic-native/barcode-scanner/ngx';
import { Router } from '@angular/router';
@Component({
  selector: 'app-display',
  templateUrl: './display.page.html',
  styleUrls: ['./display.page.scss'],
})
export class DisplayPage implements OnInit {
  member1:string;
  member2:string;
  member3:string;
  qrdata=new Array<string>(3);
  scannedcode=null
  c:any;
  email:string;
  currentUser;
  isDone:[]
  constructor(private qr:QRService,
    public storage:Storage,
    private usersService: UsersService,
    private bs:BarcodeScanner,
    private router:Router,
    private gs:GroupsService
    ) 
    {
      this.storage.get('email').then((val) => {
        this.email = val; });
      
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
    this.usersService.getUsers().subscribe(data => {
    
      data.forEach(user => {
        if (user.email === this.email ) {
          this.currentUser = user;
          this.isDone=user.isDone;
          
        }
      });
    });
    
  }

  ngOnInit() {
  }
  scanQR()
  {
    this.bs.scan().then(barcodedata=>
      {
          this.c=parseInt(barcodedata.text.charAt(0));
          this.scannedcode=barcodedata.text;
      })
      this.gs.getGroups().subscribe(data => 
        {
         data.forEach(group => 
          {
            console.log(group.groupId)
            if (group.groupId == this.c)
            {
                
                this.qrdata[0]=this.c+group.member1;
                this.qrdata[0]=this.c+group.member2;
                this.qrdata[0]=this.c+group.member3;
            }
            
          });
        });
    this.qrdata.forEach(qr=>{
      if(qr==this.scannedcode)
      {
        this.scannedcode=null;
        this.router.navigate(['/home/',this.c]);
      }
      else
      {
        this.router.navigate(['/display']);
      }
    })
 }
    
}
