import {Categorie} from "./Categorie";


export class Produit {
  id:number |null ;
  nom:String |null;
  description:String |null;
  prix:number |null;
  tva:number |null;

  categorie: Categorie[] |null;

  constructor(

  ){
    this.id=null;
    this.nom=null;
    this.description=null;
    this.prix=null;
    this.tva=null;
    this.categorie=null;

  }
}
