import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CourseComponent } from './course/course.component';

import { Table } from 'primeng/table';
import { TagModule } from 'primeng/tag';
import { HttpClientModule } from '@angular/common/http';
import { InputTextModule } from 'primeng/inputtext';
import { MultiSelectModule } from 'primeng/multiselect';
import { CommonModule } from '@angular/common';
import { TableModule } from 'primeng/table';
import { ProgressBar } from 'primeng/progressbar';
import { ButtonModule } from 'primeng/button';
import { BrowserAnimationsModule, provideAnimations } from '@angular/platform-browser/animations';
import { AllMyServicesService } from './Services/all-my-services.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DropdownModule } from 'primeng/dropdown';

@NgModule({
  declarations: [
    AppComponent,
    CourseComponent
    
    
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
    ReactiveFormsModule
     
    
  ],
  providers: [AllMyServicesService, provideAnimations()],
  bootstrap: [AppComponent]
})
export class AppModule { }
