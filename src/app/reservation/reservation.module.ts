import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReservationRoutingModule } from './reservation-routing.module';
import { GestionClientComponent } from './gestion-client/gestion-client.component';
import { GestionReservationComponent } from './gestion-reservation/gestion-reservation.component';
import {TableModule} from "primeng/table";
import {HttpClientModule} from "@angular/common/http";
import {InputTextModule} from "primeng/inputtext";
import {TagModule} from "primeng/tag";
import {MultiSelectModule} from "primeng/multiselect";
import {ButtonModule} from "primeng/button";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {DropdownModule} from "primeng/dropdown";
import {ListboxModule} from "primeng/listbox";
import {DialogModule} from "primeng/dialog";
import {InputTextareaModule} from "primeng/inputtextarea";
import { GestionTasksComponent } from './gestion-tasks/gestion-tasks.component';


@NgModule({
  declarations: [


    GestionClientComponent,
        GestionReservationComponent,
        GestionTasksComponent
  ],
  imports: [
    CommonModule,
    ReservationRoutingModule,
    TableModule,
    HttpClientModule,
    InputTextModule,
    TagModule,
    MultiSelectModule,
    ButtonModule,
    FormsModule ,
    DropdownModule,
    ReactiveFormsModule,
    ListboxModule,
    DialogModule,
    InputTextareaModule
  ]
})
export class ReservationModule { }
