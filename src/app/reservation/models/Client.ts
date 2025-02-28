import {Reservation} from "./Reservation";

export class Client {
  id:number |null ;
  nom:String |null;
  prenom:String |null;
  email:String |null;
  telephone:String |null;
  dateInscription: Date |null;
  reservations:Reservation[] |null;

  constructor(

  ){
    this.id=null;
    this.nom=null;
    this.prenom=null;
    this.email=null;
    this.telephone=null;
    this.dateInscription=null;
    this.reservations=null;
  }
}
