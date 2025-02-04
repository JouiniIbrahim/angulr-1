import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Role } from '../role-module/model/Role';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserServiceService {

  constructor(private http: HttpClient) { }



    AllUsers()
      {
        return this.http.get(`${environment.baseUrl}/User/AllUsers`);
      }

      AddUser(Data: any)
    {
      console.log("data to add ", Data)
      return this.http.post(`${environment.baseUrl}/User/CreateUser1`, Data);
    }
    
    
  UpdateUser(Data: any)
  {
    console.log("rrrrrrrrrrrrrrrrrrrrrr",Data)
    return this.http.put(`${environment.baseUrl}/User/UpdateUser/${Data.id}`, Data);
  }

  UserById(id:any){
    
    return this.http.get(`${environment.baseUrl}/User/OneUser/${id}`);
  }

  AllRoles(): Observable<Role[]>
      {
        return this.http.get<Role[]>(`${environment.baseUrl}/Role/AllRoles`);
      }


}
