import { Component } from '@angular/core';
import { GroupsService } from '../services/groups.service';
import { Group } from "../services/Group";
import * as firebase from 'firebase/app';
import { Storage } from '@ionic/storage';


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  currentUser: firebase.User;
  groups: Group[];
  

  constructor(private groupsService: GroupsService,
              private storage: Storage) {
                this.storage.get('email').then((val) => {
                  console.log("in home.page.ts");
                  console.log(val);
                });
    this.currentUser = firebase.auth().currentUser;
    console.log("this.currentUser");
    console.log(this.currentUser);
    // this.groupsService.addGroup(this.group);
    this.groupsService.getGroups().subscribe(data => {
      this.groups = data;
    });
  }

}
