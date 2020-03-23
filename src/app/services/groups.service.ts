import { Injectable } from "@angular/core";
import { Observable } from 'rxjs';
import { AngularFirestoreCollection, AngularFirestore, DocumentReference } from 'angularfire2/firestore';
import { map, take } from 'rxjs/operators';
import { Group } from './Group';
import {Storage} from '@ionic/storage'


@Injectable({
    providedIn: 'root'
})

export class GroupsService
{

  currentGroup:any;
    private groups: Observable<Group[]>;
    private groupsCollection: AngularFirestoreCollection<Group>;

    constructor(private afs: AngularFirestore,public storage:Storage)
    {
        this.groupsCollection = this.afs.collection<Group>('groups');
        this.groups = this.groupsCollection.valueChanges();
        console.log("in groupservice constructor");
        console.log(this.groups);
    }

    getGroups(): Observable<Group[]>
    {
        console.log("in getGroups method");
        return this.groups;
    }

    addGroup(group: Group): Promise<DocumentReference> {
        return this.groupsCollection.add(group);
    }
    getGroupById(id:Number)
    {

        return this.afs.collection<Group>('groups').doc('id');
    }
    setGroupMember(id:number)
    {
        console.log("inside setGroupMember");
        console.log(id)
        this.currentGroup=this.afs.collection<Group>('groups').doc('id');
        console.log(this.currentGroup)

    }
    getIndexNumber(id:number)
    {
        return this.afs.collection('groups').doc('id');
    }
}

