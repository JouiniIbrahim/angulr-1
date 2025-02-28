import {Client} from "./Client";
import {StatutReservation} from "./StatutReservation";

export class Reservation {
  id:number |null ;
  dateDebut:Date |null;
  dateFin:Date |null;
  prixTotal:number |null;
  statut: StatutReservation | null;
  client:Client[] |null;

  constructor(

  ){
    this.id=null;
    this.dateDebut=null;
    this.dateFin=null;
    this.prixTotal=null;
    this.statut=null;
    this.client=null;
  }
}
