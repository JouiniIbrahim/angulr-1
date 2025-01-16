import { Component, OnInit, ViewChild } from '@angular/core';

import { Table } from 'primeng/table';



import { AllMyServicesService } from '../Services/all-my-services.service';


@Component({
  selector: 'app-course',
  templateUrl: './course.component.html',
  styleUrls: ['./course.component.scss'],
  
    providers: [AllMyServicesService]
})
export class CourseComponent implements OnInit {
  ListCourse: any;  
  loading: boolean = true;  
  searchValue: string | undefined;  
  @ViewChild('dt1') dt1!: Table;
  

  constructor(private Service: AllMyServicesService) {}

  ngOnInit(): void {
    
    this.GetList();
    
  }

  onInputChange(event: Event): void {
    const value = (event.target as HTMLInputElement).value;
    console.log("------------",value)
    this.dt1.filterGlobal(value, 'contains');
  }

    GetList() {
    this.Service.AllCourses().subscribe(
      (Res: any) => {
        this.ListCourse = Res;  
        this.loading = false;  
        
        console.log('List of Courses:', this.ListCourse);
      },
      (error: any) => {
        console.log('Error fetching Courses:', error);
        this.loading = false; 
      }
    );
    
    ;
  }

  clear(table: Table) { 
    table.clear(); 
    this.searchValue = '';  
  }
}
