import { Timestamp } from 'rxjs/internal/operators/timestamp';

export class Group {
    projectTitle:string;
    projectDescription:string;
    groupId: number;
    name: string;
    marks: number;
    time: Timestamp<any>;
    member1:string;
    member2:string;
    member3:string;
    index:number;
}
