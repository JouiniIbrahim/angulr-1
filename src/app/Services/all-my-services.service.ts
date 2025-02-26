import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import {Role} from "../role-module/model/Role";
import {Categorie} from "../market/model/Categorie";

@Injectable({
  providedIn: 'root'
})
export class AllMyServicesService {

  constructor(private http: HttpClient) {


  }

  AllUsers1(): Observable<any>
  {
    return this.http.get(`${environment.baseUrl}/User/AllUsers`);
  }


  AllRoles1(): Observable<any>
  {
    return this.http.get<any>(`${environment.baseUrl}/Role/AllRoles`);
  }

  // AllCourses1(): Observable<any>
  // {
  //   return this.http.get(`${environment.baseUrl}/Course/AllCourses`);
  // }

  AllProduits1(): Observable<any>
  {
    return this.http.get(`${environment.baseUrl}/produit/all`);
  }

  AllCats1(): Observable<any>
  {
    return this.http.get<any>(`${environment.baseUrl}/Categorie/AllCats`);
  }




}
