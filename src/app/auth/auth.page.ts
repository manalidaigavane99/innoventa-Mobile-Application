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
  member1:string;
  member2:string;
  member3:string;
  str2 = new String( "@gmail.com" ); 
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
          console.log(this.email.substring(0,5));
          this.id=parseInt(this.email.charAt(5));
          this.gs.getGroups().subscribe(data => 
          {
           data.forEach(group => 
            {
              console.log(group.groupId)
              if (group.groupId == this.id )
              {
                  
                  this.storage.set('member1', this.id+group.member1);
                  this.storage.set('member2', this.id+group.member2);
                  this.storage.set('member3', this.id+group.member3);
              }
              
            });
          });
          
          this.router.navigate(['/qr']);
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
