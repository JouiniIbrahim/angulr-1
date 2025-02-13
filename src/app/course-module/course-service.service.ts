import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import {Observable} from "rxjs";

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



    CourseById(IdCourse:string)
  {
    return this.http.get(`${environment.baseUrl}/Course/OneCourse/${IdCourse}`);
  }


  getFile(courseId: number) {
    return this.http.get(`${environment.baseUrl}/Course/down/${courseId}`, { responseType: 'blob' });
  }
  viewFile(courseId: number) {
    return this.http.get(`${environment.baseUrl}/Course/view/${courseId}`, { responseType: 'blob' });
  }



}
