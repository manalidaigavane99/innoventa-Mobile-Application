import { Component, OnInit } from '@angular/core';
import { User } from '././../auth/auth.page';
import { UsersService } from 'src/app/services/usersService.service';
import * as firebase from 'firebase/app';
import { Storage } from '@ionic/storage';
import { Router, ActivatedRoute } from '@angular/router';
import { FirestoreService } from '../services/firestore.service';
import { Group } from '../services/Group';
import { GroupsService } from '../services/groups.service';

@Component({
  selector: 'app-feedback',
  templateUrl: './feedback.page.html',
  styleUrls: ['./feedback.page.scss'],
})
export class FeedbackPage implements OnInit {

  eventrating=1;
  apprating=1;
  comments: String;
  suggestions: String;
  email:string;
  currentUser;
  users: User[];

  constructor(private storage: Storage,
              private router: Router,
              private route:ActivatedRoute,
              private fs:FirestoreService,
              private usersService: UsersService,
              )
    {
   // console.log("in group info constructor");
    this.storage.get('email').then((val) => {
      this.email = val;
     // console.log(this.email);

    });
    this.usersService.getUsers().subscribe(data => {
      this.users = data;
      //console.log("data: ")
      //console.log(data);
      this.users.forEach(user => {
        if (user.email === this.email ) {
          this.currentUser = user;
        //  console.log("currnt user is");
         // console.log(user);
        }
      });
    });
  }

  ngOnInit() {
  }

  onSubmit()
  {
      this.fs.updatefeedback(this.eventrating,this.apprating,this.comments,this.suggestions);

  }
}
