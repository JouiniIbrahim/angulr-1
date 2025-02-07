import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MarketRoutingModule } from './market-routing.module';
import { ProduitComponent } from './produit/produit.component';
import { CategorieComponent } from './categorie/categorie.component';
import {ButtonModule} from "primeng/button";
import {InputTextModule} from "primeng/inputtext";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {SharedModule} from "primeng/api";
import {TableModule} from "primeng/table";
import {GenericModalComponent} from "./generic-modal/generic-modal.component";
import {PaginatorModule} from "primeng/paginator";
import {HttpClientModule} from "@angular/common/http";
import {TagModule} from "primeng/tag";
import {MultiSelectModule} from "primeng/multiselect";
import {DropdownModule} from "primeng/dropdown";
import {ListboxModule} from "primeng/listbox";
import {DialogModule} from "primeng/dialog";
import {InputTextareaModule} from "primeng/inputtextarea";


@NgModule({
  declarations: [
    ProduitComponent,
    CategorieComponent,
    GenericModalComponent

  ],
  imports: [
    CommonModule,
    MarketRoutingModule,
    ButtonModule,
    InputTextModule,
    ReactiveFormsModule,
    SharedModule,
    TableModule,
    FormsModule,
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
export class MarketModule { }
