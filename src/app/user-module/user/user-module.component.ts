import { ApplicationRef, Component, ComponentFactoryResolver, Injector, OnInit, ViewChild } from '@angular/core';
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
    { key: 'firstname', label: 'FirstName', type: 'text', options: null },
    { key: 'lastname', label: 'LastName', type: 'text', options: null },
    { key: 'username', label: 'UserName', type: 'text', options: null },
    { key: 'password', label: 'Password', type: 'password', options: null },
    { key: 'email', label: 'Email', type: 'text', options: null },
    {
      key: 'roles',
      label: 'Roles',
      type: 'dropdown',
      options: null,
      multiSelect: true,
    },
  ];

  fields: Field[] = [];

  constructor(
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
    this.selectedUser = {};
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

      
      this.showModalComponent();
    });
  
  }

  openViewModal(id: any): void {
    console.log('Opening view modal for user ID:', id);

    this.Service.UserById(id).subscribe((user: any) => {
      this.selectedUser = user;
      this.modalMode = 'view';

      console.log("user--------",user);
     
      this.Service.AllRoles().subscribe((roles: Role[]) => {
        const roleOptions = roles.map((role) => ({
          label: role.name,
          value: role.id,
          selected: this.selectedUser.roles.some((userRole: Role) => userRole.id === role.id),
        }));
  
        const rolesField = this.userFields.find((field) => field.key === 'roles');
        if (rolesField) {
          rolesField.options = roleOptions;
        }
  
        this.fields = [...this.userFields];
        this.showModalComponent();
      });
    });
  }

  openEditModal(id: any): void {
    console.log('Opening edit modal for user ID:', id);
  
    this.Service.UserById(id).subscribe((user: any) => {
      this.selectedUser = user;
      this.modalMode = 'edit';
      console.log("user--------",user);
      this.Service.AllRoles().subscribe((roles: Role[]) => {
        const rolesWithSelection = roles.map((role) => ({
          label: role.name,
          value: role.id,
          selected: this.selectedUser.roles.some((userRole: Role) => userRole.id === role.id),
        }));

        
        this.selectedUser.roles = rolesWithSelection;

        
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
    modalRef.instance.data = this.selectedUser;
    modalRef.instance.fields = this.userFields;
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

  onSave(updatedUser: any): void {
    // // Transform roles if necessary
    // if (updatedUser.roles && updatedUser.roles.length > 0) {
    //   updatedUser.roles = updatedUser.roles.map((role: any) => role.value || role.id);
    // }
  
    if (this.modalMode === 'add') {
      console.log('Adding new user:', updatedUser);
  
      this.Service.AddUser(updatedUser).subscribe(
        (res) => {
          console.log('User created!');
          this.GetList();
          Swal.fire('Success!', 'User created successfully.', 'success');
        },
        (error) => {
          console.error('Error creating user:', error);
          Swal.fire('Error!', 'Failed to create user.', 'error');
        }
      );
    } else if (this.modalMode === 'edit') {
      Swal.fire({
        title: 'Do you want to save the changes?',
        showDenyButton: true,
        showCancelButton: true,
        confirmButtonText: 'Save',
        denyButtonText: `Don't save`,
      }).then((result) => {
        if (result.isConfirmed) {

          console.log('Updating user:', updatedUser);
  
          this.Service.UpdateUser(updatedUser).subscribe(
            (Res: any) => {
              console.log('User updated successfully:', Res);
              this.GetList();
              Swal.fire('Saved!', 'User updated successfully.', 'success');
            },
            (error: any) => {
              console.error('Error updating user:', error);
              Swal.fire('Error!', 'Failed to update user.', 'error');
            }
          );
        } else if (result.isDenied) {
          Swal.fire('Changes are not saved', '', 'info');
        }
      });
    }
  }
}