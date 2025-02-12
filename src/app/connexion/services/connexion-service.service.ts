import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {environment} from "../../../environments/environment";
import {HttpClient, HttpHeaders} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class ConnexionServiceService {

  constructor(private http: HttpClient) {
  }

  confirmAccount(Data: { email: string, password: string }): Observable<any> {
    return this.http.put(`${environment.baseUrl}/User/Confirm`, Data);
  }

  login(Data: { username: string, password: string }) {
    return this.http.post(`${environment.baseUrl}/authentification/signin`, Data)
  }

  Signout(): Observable<any> {
    const token = sessionStorage.getItem('authToken');

    if (token) {
      const headers = new HttpHeaders({
        'Authorization': `Bearer ${token}`
      });

      return this.http.get(`${environment.baseUrl}/authentification/signout`, {headers});
    } else {
      return new Observable(observer => {
        observer.error('No token found!');
      });
    }
  }
}


