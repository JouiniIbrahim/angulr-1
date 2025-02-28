import { Role } from "src/app/role-module/model/Role";

export class User {
    id:number |null ;
    firstname:String |null;
    lastname:String |null;
    username:String |null;
    password:String |null;
    email:String |null;
    roles: Role[] |null;

    constructor(

    ){
    this.id=null;
    this.firstname=null;
    this.lastname=null;
    this.username=null;
    this.password=null;
    this.email=null;
    this.roles=null;
   }
}
