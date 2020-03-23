import { Component, OnInit } from '@angular/core';
import { User } from '././../auth/auth.page';
import { UsersService } from 'src/app/services/usersService.service';
import * as firebase from 'firebase/app';
import { Storage } from '@ionic/storage';
import { Router, ActivatedRoute } from '@angular/router';
import { FirestoreService } from '../services/firestore.service';
import { Group } from '../services/Group';
import { GroupsService } from '../services/groups.service';
import { Timestamp } from 'rxjs/internal/operators/timestamp';

@Component({
  selector: 'app-group-info',
  templateUrl: './group-info.page.html',
  styleUrls: ['./group-info.page.scss'],
})
export class GroupInfoPage implements OnInit {

  range1Value = 1;
  range2Value = 1;
  range3Value = 1;
  range4Value = 1;
  range5Value = 1;
  k =0;
  total = 0;
  users: User[]; //to store array of all users
  groups:Group[];
  groupId:number;
  email:string;
  currentUser;
  currentGroup;
  projectTitle:string;
  projectDesc:string;

  qrcode:[];
  constructor(private usersService: UsersService,
              private storage: Storage,
              private router: Router,
              private route:ActivatedRoute,
              private fs:FirestoreService,
              private gs:GroupsService,
              )
    {
   // console.log("in group info constructor");
    this.storage.get('email').then((val) => {
      this.email = val;
     // console.log(this.email);

    });
    ///getting user obj by comparing email
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
    ///fetching groupid from route
    this.groupId=<number>this.route.snapshot.params['id'];
   // console.log("groupid is "+ this.groupId);
    this.gs.getGroups().subscribe(data => {
      this.groups = data;
    ///  console.log("data: ")
     // console.log(data);
      this.groups.forEach(group => {
        console.log(group.groupId)
        if (group.groupId == this.groupId ) {
          console.log("inside if")
          this.currentGroup = group;
          console.log("currnt group is");
          console.log(group);
          this.projectTitle=group.projectTitle;
          this.projectDesc=group.projectDescription;

        }
      });


    });

   }
  createCode()
  {


  }
  scanCode()
  {

  }
  ngOnInit() {
    this.currentUser = firebase.auth().currentUser;
   // console.log("ngoninit of grouppage");
    //console.log(this.currentUser);
    //this.currentGroup=this.gs.getGroupById(this.groupId);
   // console.log("printing currentGroup");
   // console.log(this.currentGroup);
  }

  onSubmit() {
   // console.log("entered in onsubmit")
    this.total = this.range1Value + this.range2Value+this.range3Value+this.range4Value+this.range5Value;

        this.currentUser['isDone'][this.groupId].marks = this.total;
        this.currentUser['isDone'][this.groupId].done = true;
        console.log("updated marks");
        console.log(this.currentUser);
        this.fs.updateUser(this.currentUser);
        for(this.k=0;this.k<3;this.k++)
        {
          if(this.currentUser['isDone'][this.k].done===false)
            break;
        }
        if(this.k===3)
        {

          if((this.email.indexOf("2016")!== -1)||(this.email.indexOf("2017")!== -1))
          {
            this.groups.forEach(group => {
            console.log(group.groupId)
            group.marks+=((this.currentUser['isDone'][group.groupId].marks)*0.3)
            this.fs.updateGroup(group);
          });

          }
          else
          {
            if(this.email.indexOf("faculty")!== -1)
            {
              this.groups.forEach(group => {
              console.log(group.groupId)
              group.marks+=((this.currentUser['isDone'][group.groupId].marks)*0.7) ;
              this.fs.updateGroup(group);
             });

            }
          }
          this.router.navigate(['/feedback']);
        }
        else{
          this.router.navigate(['/display']);
        }
  }

}
