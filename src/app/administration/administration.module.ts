import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdministrationRoutingModule } from './administration-routing.module';
import { UserComponent } from './gestion-utilisateur/user/user.component';
import {ButtonModule} from "primeng/button";
import {InputTextModule} from "primeng/inputtext";
import {PaginatorModule} from "primeng/paginator";
import {SharedModule} from "primeng/api";
import {TableModule} from "primeng/table";
import {HttpClientModule} from "@angular/common/http";
import {TagModule} from "primeng/tag";
import {MultiSelectModule} from "primeng/multiselect";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {DropdownModule} from "primeng/dropdown";
import {ListboxModule} from "primeng/listbox";
import {DialogModule} from "primeng/dialog";
import {InputTextareaModule} from "primeng/inputtextarea";
import {GenericModalComponent} from "./gestion-utilisateur/generic-modal-user/generic-modal.component";


@NgModule({
  declarations: [
GenericModalComponent,
    UserComponent
  ],
  imports: [
    CommonModule,
    AdministrationRoutingModule,
    ButtonModule,
    InputTextModule,
    PaginatorModule,
    SharedModule,
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
export class AdministrationModule { }
