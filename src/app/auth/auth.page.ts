import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';
import { Platform } from '@ionic/angular';
import * as firebase from 'firebase/app';
import { Storage } from '@ionic/storage';
import { stringify } from 'querystring';
import { GroupsService } from '../services/groups.service';
import { Group } from '../services/Group';

export class User {
  email: string;
  password: string;
  isDone: any;
  eventrating:Number;
  apprating:Number;
  comments: String;
  suggestions:String;
}

@Component({
  selector: 'app-auth',
  templateUrl: './auth.page.html',
  styleUrls: ['./auth.page.scss'],
})

export class AuthPage implements OnInit {

  email: string;
  password: string;
  id:any
  index:any;
  groupId:any;
  c1:any
  c2=null;
  str2 = new String( "@gmail.com" );
  groups:any;
  public user: User = new User();

  constructor(public fAuth: AngularFireAuth,
              public router: Router,
              public platform: Platform,
              public storage: Storage,
              public gs:GroupsService)
             {
                this.fAuth.auth.setPersistence(firebase.auth.Auth.Persistence.LOCAL).then(data =>
                {
                  console.log(data);
                })

             }

  ngOnInit()
  {
  }

  async login()
  {
    console.log("in login");
    this.email=this.user.email;
    this.user.email=this.user.email.concat("@gmail.com");
    console.log(this.user.email)
    try {
      var r = await this.fAuth.auth.signInWithEmailAndPassword(
        this.user.email,
        this.user.password
      );
      if (r)
      {

        console.log(r);
        console.log('Successfully logged in ');
        // this.nativeStorage.setItem('credential', {userName: 'this.user.email', password: 'this.user.password'});
        console.log("success");
          // set a key/value
          console.log(Date.now());
        this.storage.set('email', this.user.email);

  // Or to get a key/value pair

        if(this.email.substring(0,5)==='group')
        {
          console.log(this.email.length)
          if(this.user.email.length >16)
          {
            console.log("inside if >= 16")
            this.c1=parseInt(this.email.substring(5,6));
            this.c2=parseInt(this.email.substring(6,7));
            console.log(this.c1);
            console.log(this.c2);
          }
          else
          {
            console.log("else <=6")
              this.c1=parseInt(this.email.substring(5,6));
              console.log(this.c1);
          }
          if(this.c2!=NaN)
          {
            console.log("in if");
            this.groupId=this.c2+10*this.c1;
          }
          else
          {
            console.log("in else")
              this.groupId=this.c1;
              console.log("groupId: "+this.groupId)
          }
         /*  this.groups=await this.gs.getGroups().toPromise();
          this.groups.forEach(group => 
            {
            console.log("nn"+group.groupId)
            if (group.groupId == this.groupId ) {
              this.index=group.index;
      
            } */
           this.gs.getGroups().subscribe(data => {
   
            data.forEach(group => {
            console.log("nn"+group.groupId)
            if (group.groupId == this.groupId ) {
              this.index=group.index;
              
            }
          }); 
          setTimeout(() => {
            
          }, 3000);
          this.storage.set('index',this.index);
          this.storage.set('groupId',this.groupId);
          this.router.navigate(['/qr']);
        });
         

          
        }
        else
        {
        this.router.navigate(['/display']);
        }
      }
    } catch (err) {
      console.log(err);
    }
  }


}
