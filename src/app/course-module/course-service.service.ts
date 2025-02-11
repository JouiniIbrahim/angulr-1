import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CourseServiceService {

  constructor(private http: HttpClient) { }


  AllCourses()
  {
    return this.http.get(`${environment.baseUrl}/Course/AllCourses`);
  }

  DeleteCourse(IdCourse: string)
  {
    return this.http.delete(`${environment.baseUrl}/Course/DeleteCourse/${IdCourse}`)  ;
  }

  UpdateCourse( Data: any)
    {
      console.log("ffffffffffffff",Data)
      return this.http.put(`${environment.baseUrl}/Course/UpdateCourse`, Data);
    }

    AddCourse(Data: any)
    {
      console.log("ffffffffffffff",Data)
      return this.http.post(`${environment.baseUrl}/Course/save`, Data);
    }

  AddCourse1(Data: any)
  {return this.http.post(`${environment.baseUrl}/Course/AddCourse`, Data);
  }

    CourseById(IdCourse:string)
  {
    return this.http.get(`${environment.baseUrl}/Course/OneCourse/${IdCourse}`);
  }

  getFile (IdCourse:string)
  {
    return this.http.get(`${environment.baseUrl}/Course/${IdCourse}`,{ responseType: 'arraybuffer' });
  }


}
