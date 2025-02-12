import {ApplicationRef, Component, ComponentFactoryResolver, Injector, OnInit, ViewChild} from '@angular/core';
import {Table} from 'primeng/table';

import {Course} from '../model/Course';
import Swal from 'sweetalert2';
import {GenericModalComponent} from '../../generic-modal/generic-modal.component';
import {CourseServiceService} from '../course-service.service';


@Component({
  selector: 'app-course',
  templateUrl: './course.component.html',
  styleUrls: ['./course.component.scss'],

  providers: [CourseServiceService]
})
export class CourseComponent implements OnInit {
  ListCourse!: Course[];
  loading: boolean = true;
  searchValue: string | undefined;
  @ViewChild('dt') dt!: Table;


  selectedCourse: any;
  course!: Course;
  modalMode: 'view' | 'edit' | 'add' = 'view';
  showModal = false;


  courseFields = [
    {key: 'name', label: 'Name', type: 'text', options: null},
    {key: 'description', label: 'Description', type: 'textarea', options: null},
    {key: 'category', label: 'Category', type: 'text', options: null},
    {key: 'published', label: 'Published', type: 'date', options: null},
    {key: 'level', label: 'Level', type: 'text', options: null},
    {key: 'support', label: 'Support', type: 'file', options: null}
  ];


  constructor(private Service: CourseServiceService, private componentFactoryResolver: ComponentFactoryResolver, private appRef: ApplicationRef,
              private injector: Injector) {
  }


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
        this.ListCourse = Res.map((el: any) => el ? {...el, published: new Date(el.published)} : null);
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

  // downloadFile(IdCourse: string): void {
  //   this.Service.getFile(IdCourse).subscribe(
  //     (data: ArrayBuffer) => {
  //       const blob = new Blob([data], { type: 'application/pdf'});
  //       const downloadUrl = window.URL.createObjectURL(blob);
  //       const a = document.createElement('a');
  //       a.href = downloadUrl;
  //       a.download = IdCourse;
  //       window.URL.revokeObjectURL(downloadUrl);
  //     },
  //     error => {
  //       console.error("Error downloading file", error);
  //     }
  //   );
  // }




  /*------------------------modal managment --------------------------------------*/


  openViewModal(IdCourse: any): void {
    this.Service.CourseById(IdCourse).subscribe((course) => {
      this.selectedCourse = course;
      this.modalMode = 'view';
      this.showModalComponent();
    });
  }


  openEditModal(IdCourse: any): void {

    this.Service.CourseById(IdCourse).subscribe((course) => {
      console.log('----------------------', IdCourse)
      this.selectedCourse = course;
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
    modalRef.instance.fields = this.modalMode !== "view" ? this.courseFields.filter((el: any) => el.key != "published") : this.courseFields;
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
  DeleteCourse(IdCourse: any) {
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


  onSave(updatedCourse: any): void {
    const formData = new FormData();

    if (this.modalMode === 'add') {
      console.log('Adding new course:', updatedCourse);
      const courseDto = {
        name: updatedCourse.name,
        description: updatedCourse.description,
        category: updatedCourse.category,
        level: updatedCourse.level,
        support: null,
      };
      formData.append('courseDto.name', courseDto.name);
      formData.append('courseDto.description', courseDto.description);
      formData.append('courseDto.category', courseDto.category);
      formData.append('courseDto.level', courseDto.level);
      const fileInput = updatedCourse.support;
      if (fileInput && fileInput.length > 0) {
        formData.append('support', fileInput[0], fileInput[0].name);
      }
      this.Service.AddCourse(formData).subscribe(
        (res) => {
          console.log("Course created successfully!");
          this.GetList();
        },
        (error) => {
          console.log("Error creating course:", error);
        }
      );
    } else if (this.modalMode === 'edit') {
      const courseDto = {
        id: updatedCourse.id,
        name: updatedCourse.name,
        description: updatedCourse.description,
        category: updatedCourse.category,
        level: updatedCourse.level,
        support: null,
      };
      Swal.fire({
        title: "Do you want to save the changes?",
        showDenyButton: true,
        showCancelButton: true,
        confirmButtonText: "Save",
        denyButtonText: `Don't save`
      }).then((result) => {
        if (result.isConfirmed) {
          formData.append('courseDto.id', courseDto.id);
          formData.append('courseDto.name', courseDto.name);
          formData.append('courseDto.description', courseDto.description);
          formData.append('courseDto.category', courseDto.category);
          formData.append('courseDto.level', courseDto.level);
          const fileInput = updatedCourse.support;
          if (fileInput && fileInput.length > 0) {
            formData.append('support', fileInput[0], fileInput[0].name);
          }
          this.Service.UpdateCourse(formData).subscribe(
            (res) => {
              console.log('Course updated successfully!');
              this.GetList();
              Swal.fire("Saved!", "", "success");
            },
            (error) => {
              console.log('Error updating course:', error);
              Swal.fire("Error!", "There was an issue updating the course.", "error");
            }
          );
        } else if (result.isDenied) {
          Swal.fire("Changes not saved", "", "info");
        }
      });
    }
  }


}
