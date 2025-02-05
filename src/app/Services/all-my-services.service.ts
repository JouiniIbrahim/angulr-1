import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AllMyServicesService {

  constructor(private http: HttpClient) { }

  confirmAccount(Data: { email: string, password: string }): Observable<any>
    {
      return this.http.put(`${environment.baseUrl}/User/Confirm`, Data);
    }
    

}
