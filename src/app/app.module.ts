import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';


import { TagModule } from 'primeng/tag';
import { HttpClientModule } from '@angular/common/http';
import { InputTextModule } from 'primeng/inputtext';
import { MultiSelectModule } from 'primeng/multiselect';

import { ButtonModule } from 'primeng/button';
import { BrowserAnimationsModule, provideAnimations } from '@angular/platform-browser/animations';
import { AllMyServicesService } from './Services/all-my-services.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DropdownModule } from 'primeng/dropdown';
import { ListboxModule } from 'primeng/listbox';
import { DialogModule } from 'primeng/dialog';

import { InputTextareaModule } from 'primeng/inputtextarea';
import { GenericModalComponent } from './generic-modal/generic-modal.component';
import { HomeComponent } from './home/home.component';
import { ConfirmAccountComponent } from './connexion/confirm-account/confirm-account.component';
import {TableModule} from "primeng/table";
import {AdministrationModule} from "./administration/administration.module";
import {ConnexionModule} from "./connexion/connexion.module";
import { TestRxJSComponent } from './test-rx-js/test-rx-js.component';



@NgModule({
  declarations: [
    AppComponent,
    GenericModalComponent,
    HomeComponent,
    TestRxJSComponent,




  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    TableModule,
    HttpClientModule,
    InputTextModule,
    TagModule,
    MultiSelectModule,
    ButtonModule,
    BrowserAnimationsModule,
    FormsModule,
    DropdownModule,
    ReactiveFormsModule,
    ListboxModule,
    DialogModule,
    InputTextareaModule,
    AdministrationModule,
    ConnexionModule




  ],
  providers: [AllMyServicesService, provideAnimations()],
  bootstrap: [AppComponent]
})
export class AppModule { }
