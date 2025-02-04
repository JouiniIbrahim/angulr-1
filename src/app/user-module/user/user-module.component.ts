import { ApplicationRef, Component, ComponentFactoryResolver, Injector, OnInit, Renderer2, ViewChild } from '@angular/core';
import { User } from '../model/User';
import { Table } from 'primeng/table';
import { UserServiceService } from '../user-service.service';
import { GenericModalComponent } from 'src/app/generic-modal/generic-modal.component';
import Swal from 'sweetalert2';
import { Role } from 'src/app/role-module/model/Role';

interface Field {
  key: string;
  label: string;
  type: string;
  options: { label: string | null; value: number | null }[] | null;
  multiSelect?: boolean;
}

@Component({
  selector: 'app-user-module',
  templateUrl: './user-module.component.html',
  styleUrls: ['./user-module.component.scss'],
})
export class UserModuleComponent implements OnInit {
  ListUser!: User[];
  loading: boolean = true;
  searchValue: string | undefined;
  @ViewChild('dt') dt!: Table;

  selectedUser: any;
  data: any;
  user!: User;
  modalMode: 'view' | 'edit' | 'add' = 'view';
  showModal = false;

  userFields: Field[] = [
    { key: 'firstname', label: 'FirstName', type: 'text', options: [] },
    { key: 'lastname', label: 'LastName', type: 'text', options: [] },
    { key: 'username', label: 'UserName', type: 'text', options: [] },
    { key: 'password', label: 'Password', type: 'password', options: [] },
    { key: 'email', label: 'Email', type: 'text', options: [] },
    {
      key: 'roles',
      label: 'Roles',
      type: 'dropdown',
      options: [], 
      multiSelect: true,
    },
  ];

  fields: Field[] = [];

  constructor(
    private renderer: Renderer2,
    private Service: UserServiceService,
    private componentFactoryResolver: ComponentFactoryResolver,
    private appRef: ApplicationRef,
    private injector: Injector
  ) {}

  ngOnInit(): void {
    this.GetList();
    this.loading = false;
  }

  GetList() {
    this.Service.AllUsers().subscribe(
      (Res: any) => {
        this.ListUser = Res;
        this.loading = false;
        console.log('List of Users:', this.ListUser);
      },
      (error: any) => {
        console.log('Error fetching Users:', error);
        this.loading = false;
      }
    );
  }

  onInputChange(event: Event): void {
    const value = (event.target as HTMLInputElement).value;
    console.log('------------', value);
    this.dt.filterGlobal(value, 'contains');
  }

  clear(table: Table) {
    table.clear();
    this.searchValue = '';
  }

  openAddModal(): void {
    this.selectedUser = { roles: [] };
    this.modalMode = 'add';
  
    this.Service.AllRoles().subscribe((roles: Role[]) => {
      const roleOptions = roles.map((role) => ({
        label: role.name,
        value: role.id,
      }));
  
      const rolesField = this.userFields.find((field) => field.key === 'roles');
      if (rolesField) {
        rolesField.options = roleOptions;
      }
  
      this.fields = [...this.userFields];
      this.data = { ...this.selectedUser };
      this.showModalComponent();
    });
  }

  openViewModal(id: any): void {
    this.Service.UserById(id).subscribe((user: any) => {
      this.selectedUser = user;
      this.modalMode = 'view';
  
      this.Service.AllRoles().subscribe((roles: Role[]) => {
        const roleOptions = roles.map((role) => ({
          label: role.name,
          value: role.id,
        }));
  
        const rolesField = this.userFields.find((field) => field.key === 'roles');
        if (rolesField) {
          rolesField.options = roleOptions;
        }
  
        this.fields = [...this.userFields];
        this.data = { ...this.selectedUser };
        this.showModalComponent();
      });
    });
  }
  
  openEditModal(id: any): void {
    this.Service.UserById(id).subscribe((user: any) => {
      this.selectedUser = user;
      this.modalMode = 'edit';
  
      this.Service.AllRoles().subscribe((roles: Role[]) => {
        const roleOptions = roles.map((role) => ({
          label: role.name,
          value: role.id,
        }));
  
        const rolesField = this.userFields.find((field) => field.key === 'roles');
        if (rolesField) {
          rolesField.options = roleOptions;
        }
  
        this.fields = [...this.userFields];
        this.data = { ...this.selectedUser };
        this.showModalComponent();
      });
    });
  }

  showModalComponent(): void {
    const modalFactory = this.componentFactoryResolver.resolveComponentFactory(GenericModalComponent);
    const modalRef = modalFactory.create(this.injector);
  
    modalRef.instance.visible = true;
    modalRef.instance.title =
      this.modalMode === 'view' ? 'User Details' : this.modalMode === 'edit' ? 'Edit User' : 'Add User';
    modalRef.instance.data = this.data;
    modalRef.instance.fields = this.fields;
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
  
    // Use Renderer2 to attach the event listener
    const saveButton = domElement.querySelector('.p-button[label="Save"]');
    if (saveButton) {
      this.renderer.listen(saveButton, 'click', () => {
        modalRef.instance.onSave();
      });
    }
  
    const closeButton = domElement.querySelector('.p-button[label="Close"]');
    if (closeButton) {
      this.renderer.listen(closeButton, 'click', () => {
        modalRef.instance.closeModal();
      });
    }
  }

  destroyModal(modalRef: any): void {
    this.appRef.detachView(modalRef.hostView);
    modalRef.destroy();
  }

  onSave(updatedUser: any): void {
    if (!updatedUser.id) {
      updatedUser.id = this.selectedUser.id;
    }
    if (updatedUser.roles && updatedUser.roles.length > 0) {
      updatedUser.roles = updatedUser.roles.map((role: any) => role.value || role.id);

    }
   
 if (this.modalMode === 'edit') {
      this.Service.UpdateUser(updatedUser).subscribe(
        (res) => {
          console.log('User updated successfully:', res);
          this.GetList();
          Swal.fire('Success!', 'User updated successfully.', 'success');
        },
        (error) => {
          console.error('Error updating user:', error);
          Swal.fire('Error!', 'Failed to update user.', 'error');
        }
      );
    } else  if (this.modalMode === 'add') {
      console.log('Adding new item:', );
      
      this.Service.AddUser(updatedUser).subscribe(
        (res)=>{console.log("User created !");
          console.log('user jdid ----------:', updatedUser);
          this.GetList(); 
        },
        (error)=>{console.log("User not created",error);
         
        }
        
      )
    }
  }
}