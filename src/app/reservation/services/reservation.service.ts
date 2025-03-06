import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {environment} from "../../../environments/environment";
import {Observable} from "rxjs";
import {Reservation} from "../models/Reservation";
import {StatutReservation} from "../models/StatutReservation";
import {Client} from "../models/Client";
import {Task} from "../models/Task";
import {Page} from "../models/Page";

@Injectable({
  providedIn: 'root'
})
export class ReservationService {

  constructor(private http: HttpClient) {
  }

  /*----------------------  Client Service ----------------------*/
  AllClients(): Observable<any> {
    return this.http.get(`${environment.baseUrl}/client/all`);
  }

  AddClient(Data: any) {
    console.log("ffffffffffffff", Data)
    return this.http.post(`${environment.baseUrl}/client/save`, Data);
  }

  /*----------------------  Client Service ----------------------*/

  getReservations(page: number, size: number): Observable<Page<Reservation>> {
    let params = new HttpParams()
      .set('page', page.toString())
      .set('size', size.toString());
    return this.http.get<Page<Reservation>>(`${environment.baseUrl}/reservations/all`, { params });
  }

  AddReservation(data: {
    id: number | null;
    dateDebut: Date | null;
    dateFin: Date | null;
    prixTotal: number | null;
    statut: StatutReservation | null;
    client: Client[] | null;
    statutId: number | null;
    clientid: number | null
  }): Observable<any> {
    return this.http.post(`${environment.baseUrl}/reservation/save`, data);
  }

  AllStatuts(): Observable<StatutReservation[]> {
    return this.http.get<StatutReservation[]>(`${environment.baseUrl}/statut/all`);
  }

  AllTasks(): Observable<Task[]> {
    return this.http.get<Task[]>(`${environment.baseUrl}/reservation/tasks`);
  }

  updateTaskStatus(taskId: string, processInstanceId: string, approved: boolean): Observable<any> {
    const taskApprovalDTO = {
      taskId,
      processInstanceId,
      approved
    };
    return this.http.post(`${environment.baseUrl}/reservation/agence-manager`, taskApprovalDTO, { responseType: 'text' });
  }

  CompletedTasks():Observable<any>
  {
    return this.http.get(`${environment.baseUrl}/reservation/completed-tasks`);
  }


}
