import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {GestionClientComponent} from "./gestion-client/gestion-client.component";
import {GestionReservationComponent} from "./gestion-reservation/gestion-reservation.component";
import {GestionTasksComponent} from "./gestion-tasks/gestion-tasks.component";

const routes: Routes = [{ path: 'client', component: GestionClientComponent },
  { path: 'reservation', component: GestionReservationComponent },
  { path: 'task', component: GestionTasksComponent }];
//
// { path: '', component:  }

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ReservationRoutingModule { }
