import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CourseComponent } from './CourseModule/course/course.component';


import { TagModule } from 'primeng/tag';
import { HttpClientModule } from '@angular/common/http';
import { InputTextModule } from 'primeng/inputtext';
import { MultiSelectModule } from 'primeng/multiselect';
import { CommonModule } from '@angular/common';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { BrowserAnimationsModule, provideAnimations } from '@angular/platform-browser/animations';
import { AllMyServicesService } from './Services/all-my-services.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DropdownModule } from 'primeng/dropdown';
import { ListboxModule } from 'primeng/listbox';
import { DialogModule } from 'primeng/dialog';

import { InputTextareaModule } from 'primeng/inputtextarea';
import { GenericModalComponent } from './generic-modal/generic-modal.component';



@NgModule({
  declarations: [
    AppComponent,
    CourseComponent,
    GenericModalComponent
    
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    TableModule,
    HttpClientModule, 
    CommonModule,
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
    InputTextareaModule
    
    
     
    
  ],
  providers: [AllMyServicesService, provideAnimations()],
  bootstrap: [AppComponent]
})
export class AppModule { }
