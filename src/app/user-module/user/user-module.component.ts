import { ApplicationRef, Component, ComponentFactoryResolver, Injector, OnInit, ViewChild } from '@angular/core';
import { User } from '../model/User';
import { Table } from 'primeng/table';
import { UserServiceService } from '../user-service.service';
import { GenericModalComponent } from 'src/app/generic-modal/generic-modal.component';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-user-module',
  templateUrl: './user-module.component.html',
  styleUrls: ['./user-module.component.scss']
})
export class UserModuleComponent implements OnInit {
   ListUser!: User[];
    loading: boolean = true;
    searchValue: string | undefined;
    @ViewChild('dt') dt!: Table;

    selectedUser: any;
      user!: User;
      modalMode: 'view' | 'edit' | 'add'= 'view';
      showModal = false;

      userFields = [
        { key: 'firstname', label: 'FirstName', type: 'text' },
        { key: 'lastname', label: 'LastName', type: 'text' },
        { key: 'username', label: 'UserName', type: 'text' },
        { key: 'password', label: 'Password', type: 'password' },
        { key: 'email', label: 'Email', type: 'text' },
        { key: 'roles', label: 'Roles', type: 'text' }
      ];
    

    constructor(private Service: UserServiceService , private componentFactoryResolver: ComponentFactoryResolver,private appRef: ApplicationRef,
        private injector: Injector) { }
    
    
        
      ngOnInit(): void {
    
        this.GetList();
        this.loading = false;
    
      }
      GetList() {
        this.Service.AllUsers().subscribe(
          (Res: any) => {
            this.ListUser = Res;
            this.loading = false;
            console.log("List of Users:", this.ListUser)
          },
          (error: any) => {
            console.log('Error fetching Users:', error);
            this.loading = false;
          }
        );
    
        
      }
    /*------------------- global search function--------------------*/
      onInputChange(event: Event): void {
        const value = (event.target as HTMLInputElement).value;
        console.log("------------", value)
        this.dt.filterGlobal(value, 'contains');
      }

      clear(table: Table) {
       table.clear();
       this.searchValue = '';
      }
     /*------------------- global search function--------------------*/


      openAddModal(): void {
         this.selectedUser = {}; 
         this.modalMode = 'add'; 
         this.showModalComponent();
       }

       openViewModal(Data: any): void {
        console.log("555555555555555555555555")
        this.Service.UserById(Data).subscribe((user:any) =>{
          console.log('----------------------',Data.id )
        this.selectedUser = user ; 
        this.modalMode = 'view'; 
        this.showModalComponent();
      });
      }
    
      
      openEditModal(id: any): void {
        console.log("555555555555555555555555")
        this.Service.UserById(id).subscribe((user:any) =>{
          console.log('----------------------',id )
        this.selectedUser = user ; 
        this.modalMode = 'edit'; // Set mode to edit
        this.showModalComponent();
      });
      }
     
      
       showModalComponent(): void {
         const modalFactory = this.componentFactoryResolver.resolveComponentFactory(GenericModalComponent);
         const modalRef = modalFactory.create(this.injector);
     
         modalRef.instance.visible = true;
         modalRef.instance.title = this.modalMode === 'view' ? 'User Details' : this.modalMode === 'edit' ? 'Edit User' : 'Add User';
         modalRef.instance.data = this.selectedUser;
         modalRef.instance.fields = /*this.modalMode!=="add"?this.userFields.filter((el:any)=>el.key!="password"):*/this.userFields;
         modalRef.instance.mode = this.modalMode;
     
         modalRef.instance.visibleChange.subscribe((visible: boolean) => {
           if (!visible) {
             this.destroyModal(modalRef);
           }
         });
     
         modalRef.instance.save.subscribe((updatedUser: any) => {
           this.onSave(updatedUser);
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


       /*------------------------Add and edit --------------------------------------*/
       
       
        onSave(updatedUser: any ): void {
         if (this.modalMode === 'add') {
           console.log('Adding new item:', );
           
           this.Service.AddUser(updatedUser).subscribe(
             (res)=>{console.log("User created !");
               this.GetList(); 
             },
             (error)=>{console.log("User not created",error);
              
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
               this.Service.UpdateUser(updatedUser).subscribe(
                 (Res: any) => {console.log('List of Users:', this.ListUser);
                   this.GetList(); 
                    
                   
                 },
                 (error: any) => {
                   console.log('Error ending User:', error);
                   
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
