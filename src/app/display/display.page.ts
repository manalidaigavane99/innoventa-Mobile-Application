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
  
  scannedcode=null
  c1:any;
  c2:any;
  email:string;
  currentUser;
  isDone:[]
  groupId:any;
  actualQrCode:string;
  group:any;
  index:number;

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
          this.c1=parseInt(barcodedata.text.charAt(0));
          this.c2=barcodedata.text.charAt(1);
          if(this.c2 == 'g')
          {
            this.groupId=this.c1;
          }
          else
          {
            this.groupId=this.c2+this.c1*10;
          }
          this.gs.getGroups().subscribe(data => {
   
            data.forEach(group => {
            console.log("nn"+group.groupId)
            if (group.groupId == this.groupId ) {
              this.index=group.index;
              
            }
          }); 
          
        });
          setTimeout(() => {
              
          }, 5000);
           this.index=this.index-1;
          this.actualQrCode=this.groupId+"group"+this.index;
          this.scannedcode=barcodedata.text;
      })
      
   
      if(this.actualQrCode==this.scannedcode)
      {
        this.scannedcode=null;
        this.router.navigate(['/home/',this.groupId]);
      }
      else
      {
        this.router.navigate(['/display']);
      }
    
 }
    
}
