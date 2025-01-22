import { ApplicationRef, Component, ComponentFactoryResolver, Injector, OnInit, ViewChild } from '@angular/core';
import { Table } from 'primeng/table';
import { AllMyServicesService } from '../../Services/all-my-services.service';
import { Course } from '../model/Course';
import Swal from 'sweetalert2';
import { GenericModalComponent } from '../../generic-modal/generic-modal.component';


@Component({
  selector: 'app-course',
  templateUrl: './course.component.html',
  styleUrls: ['./course.component.scss'],

  providers: [AllMyServicesService]
})
export class CourseComponent implements OnInit {
  ListCourse!: Course[];
  loading: boolean = true;
  searchValue: string | undefined;
  @ViewChild('dt') dt!: Table;


  selectedCourse: any;
  course!: Course;
  modalMode: 'view' | 'edit' | 'add'= 'view';
  showModal = false;


  courseFields = [
    { key: 'name', label: 'Name', type: 'text' },
    { key: 'description', label: 'Description', type: 'textarea' },
    { key: 'category', label: 'Category', type: 'text' },
    { key: 'published', label: 'Published', type: 'date' },
    { key: 'level', label: 'Level', type: 'text' }
  ];


  constructor(private Service: AllMyServicesService , private componentFactoryResolver: ComponentFactoryResolver,private appRef: ApplicationRef,
    private injector: Injector) { }


    
  ngOnInit(): void {

    this.GetList();
    this.loading = false;

  }

  onInputChange(event: Event): void {
    const value = (event.target as HTMLInputElement).value;
    console.log("------------", value)
    this.dt.filterGlobal(value, 'contains');
  }

  GetList() {
    this.Service.AllCourses().subscribe(
      (Res: any) => {
        this.ListCourse = Res.map((el: any) => el ? { ...el, published: new Date(el.published) } : null);
        this.loading = false;
        console.log(typeof (this.ListCourse[0].published));
        console.log('List of Courses:', this.ListCourse);
      },
      (error: any) => {
        console.log('Error fetching Courses:', error);
        this.loading = false;
      }
    );

    
  }

  /*------------------------modal managment --------------------------------------*/

 

  openViewModal(IdCourse: any): void {
    this.Service.CourseById(IdCourse).subscribe((course) =>{
    this.selectedCourse = course ; 
    this.modalMode = 'view'; 
    this.showModalComponent();
  });
  }

  
  openEditModal(IdCourse: any): void {
    
    this.Service.CourseById(IdCourse).subscribe((course) =>{
      console.log('----------------------',IdCourse )
    this.selectedCourse = course ; 
    this.modalMode = 'edit'; // Set mode to edit
    this.showModalComponent();
  });
  }

  openAddModal(): void {
    this.selectedCourse = {}; 
    this.modalMode = 'add'; 
    this.showModalComponent();
  }

 
  showModalComponent(): void {
    const modalFactory = this.componentFactoryResolver.resolveComponentFactory(GenericModalComponent);
    const modalRef = modalFactory.create(this.injector);

    modalRef.instance.visible = true;
    modalRef.instance.title = this.modalMode === 'view' ? 'Course Details' : this.modalMode === 'edit' ? 'Edit Course' : 'Add Course';
    modalRef.instance.data = this.selectedCourse;
    modalRef.instance.fields = this.modalMode!=="view"?this.courseFields.filter((el:any)=>el.key!="published"):this.courseFields;
    modalRef.instance.mode = this.modalMode;

    modalRef.instance.visibleChange.subscribe((visible: boolean) => {
      if (!visible) {
        this.destroyModal(modalRef);
      }
    });

    modalRef.instance.save.subscribe((updatedCourse: any) => {
      this.onSave(updatedCourse);
      this.destroyModal(modalRef);
    });

    this.appRef.attachView(modalRef.hostView);
    const domElement = (modalRef.hostView as any).rootNodes[0] as HTMLElement;
    document.body.appendChild(domElement);
  }

  destroyModal(modalRef: any): void {
    this.appRef.detachView(modalRef.hostView);
    modalRef.destroy();
  }
/*------------------------clear search --------------------------------------*/

  clear(table: Table) {
    table.clear();
    this.searchValue = '';
  }
/*------------------------Delete --------------------------------------*/
  DeleteCourse(IdCourse:any)
  {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        
        this.Service.DeleteCourse(IdCourse).subscribe(
          (res) => {
            console.log('List of Courses:', this.ListCourse);   
            this.GetList();  
            
            
            Swal.fire({
              title: "Deleted!",
              text: "Your file has been deleted.",  
              icon: "success"
            });
          },
          (error) => {  
            console.log('Error deleting loan:', error);
            Swal.fire({
              title: "Error",
              text: "There was an error deleting the course.",
              icon: "error"
            });
          }
        );
      }
    });
}

 

/*------------------------Add and edit --------------------------------------*/


 onSave(updatedCourse: any ): void {
  if (this.modalMode === 'add') {
    console.log('Adding new item:', );
    
    this.Service.AddCourse(updatedCourse).subscribe(
      (res)=>{console.log("Course created !");
        this.GetList(); 
      },
      (error)=>{console.log("Course not created",error);
       
      }
      
    )
  } else if (this.modalMode === 'edit') {
    Swal.fire({
      title: "Do you want to save the changes?",
      showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: "Save",
      denyButtonText: `Don't save`
    }).then((result) => {
      
      if (result.isConfirmed) {
        this.Service.UpdateCourse(updatedCourse).subscribe(
          (Res: any) => {console.log('List of Courses:', this.ListCourse);
            this.GetList(); 
             
            
          },
          (error: any) => {
            console.log('Error ending course:', error);
            
          }
        );
        Swal.fire("Saved!", "", "success");
      } else if (result.isDenied) {
        Swal.fire("Changes are not saved", "", "info");
      }
    });
     
    
}

}

}
