import {NgModule, NO_ERRORS_SCHEMA} from '@angular/core';
import { CommonModule } from '@angular/common';

import { CourseModuleRoutingModule } from './course-module-routing.module';
import { TableModule } from 'primeng/table';
import { HttpClientModule } from '@angular/common/http';
import { InputTextModule } from 'primeng/inputtext';
import { TagModule } from 'primeng/tag';
import { MultiSelectModule } from 'primeng/multiselect';
import { ButtonModule } from 'primeng/button';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DropdownModule } from 'primeng/dropdown';
import { ListboxModule } from 'primeng/listbox';
import { DialogModule } from 'primeng/dialog';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { CourseComponent } from './course/course.component';



@NgModule({
  declarations: [
    CourseComponent

  ],
  imports: [
    CommonModule,
    CourseModuleRoutingModule,
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
  ],
  schemas: [NO_ERRORS_SCHEMA],
})
export class CourseModuleModule { }
