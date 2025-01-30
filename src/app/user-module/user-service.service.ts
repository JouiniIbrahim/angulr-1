import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

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
      return this.http.post(`${environment.baseUrl}/User/AddUser`, Data);
    }
    
    
  UpdateUser( Data: any)
  {
    return this.http.put(`${environment.baseUrl}/User/UpdateUser`, Data);
  }

  UserById(id:any){
    
    return this.http.get(`${environment.baseUrl}/User/OneUser/${id}`);
  }
  
}
