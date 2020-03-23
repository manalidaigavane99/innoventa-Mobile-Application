import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument } from 'angularfire2/firestore';
import { AngularFirestoreCollection } from 'angularfire2/firestore'
import { Storage } from '@ionic/storage';
import { Group } from '../services/Group';

@Injectable({
  providedIn: 'root'
})
export class FirestoreService
 {
    email:string
  constructor(public firestore: AngularFirestore,private storage:Storage) {
    this.storage.get('email').then((val) => {
        this.email = val;
        console.log(this.email);

      });
  }

  updateUser(user:any)
  {
      console.log("in firestore service");
      console.log(user.isDone);
      this.firestore.collection('users').doc(this.email).update(
      {    isDone : user.isDone}
      );
  }

    updateGroup(group:Group)
    {
      console.log("in firestore service updateGroup");
      //console.log(.isDone);

      console.log(group.groupId)
      this.firestore.collection('groups').doc(group.groupId.toString()).update(
      {    marks : group.marks}
      );
  }

  updatefeedback(eventrating:Number,apprating:Number,comments:String,suggestions:String)
  {
    this.firestore.collection('users').doc(this.email).update(
    {    eventrating: eventrating,
         apprating: apprating,
         suggestions: suggestions,
         comments:comments}

    );
  }
  updateIndex(index:number,id:number)
  {
    console.log("in firestore service");
      
      this.firestore.collection('groups').doc(id.toString()).update(
      {    index : index}
      );
  }
}
