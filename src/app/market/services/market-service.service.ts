import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../environments/environment";
import {catchError, Observable, throwError} from "rxjs";
import {Role} from "../../role-module/model/Role";
import {Categorie} from "../model/Categorie";

@Injectable({
  providedIn: 'root'
})
export class MarketServiceService {

  constructor(private http: HttpClient) { }


  AllProduits()
  {
    return this.http.get(`${environment.baseUrl}/produit/all`);
  }

  AddProduit(Data: any)
  {
    console.log("data to add ", Data)
    return this.http.post(`${environment.baseUrl}/produit/save`, Data);
  }

  UpdateProduit(Data: any)
  {
    console.log("rrrrrrrrrrrrrrrrrrrrrr",Data)
    return this.http.put(`${environment.baseUrl}/produit/update`, Data);
  }

  AllCats(): Observable<Categorie[]>
  {
    return this.http.get<Categorie[]>(`${environment.baseUrl}/Categorie/AllCats`);
  }

  ProduitById(id:any){

    return this.http.get(`${environment.baseUrl}/produit/find-one/${id}`);
  }

  OneCat(id:any){
    return this.http.get(`${environment.baseUrl}/Categorie/OneCat/${id}`);
  }

  DeleteProduit(id: number): Observable<any> {
    return this.http.delete(`http://localhost:8085/produit/delete/${id}`, { responseType: 'text' })
      .pipe(
        catchError((error) => {
          console.error('Error deleting produit:', error);
          return throwError(error);
        })
      );
  }

}
