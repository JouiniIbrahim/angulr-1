import {
  ApplicationRef,
  Component,
  ComponentFactoryResolver,
  Injector,
  OnInit,
  Renderer2,
  ViewChild
} from '@angular/core';
import {User} from "../../administration/gestion-utilisateur/model/User";
import {Table} from "primeng/table";



import Swal from "sweetalert2";
import {Produit} from "../model/Produit";
import {MarketServiceService} from "../services/market-service.service";
import {Categorie} from "../model/Categorie";
import {GenericModalComponent} from "../generic-modal/generic-modal.component";


interface Field {
  key: string;
  label: string;
  type: string;
  options: { label: string | null; value: number | null }[] | null;
  multiSelect?: boolean;
}

@Component({
  selector: 'app-produit',
  templateUrl: './produit.component.html',
  styleUrls: ['./produit.component.scss']
})
export class ProduitComponent  implements OnInit {
  ListProduit!: Produit[];
  loading: boolean = true;
  searchValue: string | undefined;
  @ViewChild('dt') dt!: Table;

  selectedProduit: any;
  data: any;
  produit!: Produit;
  modalMode: 'view' | 'edit' | 'add' = 'view';
  showModal = false;

  produitFields: Field[] = [
    { key: 'nom', label: 'Name', type: 'text', options: [] },
    { key: 'description', label: 'description', type: 'text', options: [] },
    { key: 'prix', label: 'Price', type: 'text', options: [] },
    { key: 'tva', label: 'TVA', type: 'text', options: [] },
    // { key: 'prixTTC', label: 'TTC', type: 'text', options: [] },
    {
      key: 'categorie',
      label: 'Categorie',
      type: 'dropdown',
      options: [],
      multiSelect: false,
    },
  ];

  fields: Field[] = [];

  constructor(
    private renderer: Renderer2,
    private Service: MarketServiceService,
    private componentFactoryResolver: ComponentFactoryResolver,
    private appRef: ApplicationRef,
    private injector: Injector
  ) {}

  ngOnInit(): void {
    this.GetList();
    this.loading = false;
  }

  GetList() {
    this.Service.AllProduits().subscribe(
      (Res: any) => {
        this.ListProduit = Res;
        this.loading = false;
        console.log('List of Produit:', this.ListProduit);
      },
      (error: any) => {
        console.log('Error fetching Produit:', error);
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
    this.selectedProduit = { categorie: [] };
    this.modalMode = 'add';

    this.Service.AllCats().subscribe((categorie: Categorie[]) => {
      const catOptions = categorie.map((categorie) => ({
        label: categorie.nom,
        value: categorie.id,
      }));

      const catField = this.produitFields.find((field) => field.key === 'categorie');
      if (catField) {
        catField.options = catOptions;
      }

      this.fields = [...this.produitFields];
      this.data = { ...this.selectedProduit };
      this.showModalComponent();
    });
  }

  openViewModal(id: any): void {
    this.Service.ProduitById(id).subscribe((produit: any) => {
      this.selectedProduit = produit;
      this.modalMode = 'view';

      this.Service.AllCats().subscribe((categorie: Categorie[]) => {
        const catOptions = categorie.map((categorie) => ({
          label: categorie.nom,
          value: categorie.id,
        }));

        const catField = this.produitFields.find((field) => field.key === 'categorie');
        if (catField) {
          catField.options = catOptions;
        }

        this.fields = [...this.produitFields];
        this.data = { ...this.selectedProduit };
        this.showModalComponent();
      });
    });
  }

  openEditModal(id: any): void {
    this.Service.ProduitById(id).subscribe((produit: any) => {
      this.selectedProduit = produit;
      this.modalMode = 'edit';

      this.Service.AllCats().subscribe((categorie: Categorie[]) => {
        const catOptions = categorie.map((categorie) => ({
          label: categorie.nom,
          value: categorie.id,
        }));

        const catField = this.produitFields.find((field) => field.key === 'categorie');
        if (catField) {
          catField.options = catOptions;
        }


        this.fields = [...this.produitFields];
        this.data = { ...this.selectedProduit };
        this.showModalComponent();
      });
    });
  }

  showModalComponent(): void {
    const modalFactory = this.componentFactoryResolver.resolveComponentFactory(GenericModalComponent);
    const modalRef = modalFactory.create(this.injector);

    modalRef.instance.visible = true;
    modalRef.instance.title =
      this.modalMode === 'view' ? 'Category Details' : this.modalMode === 'edit' ? 'Edit Category' : 'Add Categoryx';
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

  onSave(updatedProduit: any): void {
    if (!updatedProduit.id) {
      updatedProduit.id = this.selectedProduit.id;
    }


        updatedProduit.categorie = {
          id: updatedProduit.categorie,
          nom: this.getCategorieName(updatedProduit.categorie) };

    if (this.modalMode === 'edit') {
      this.Service.UpdateProduit(updatedProduit).subscribe(
        (res) => {
          console.log('Produit updated successfully:', res);
          this.GetList();
          Swal.fire('Success!', 'Produit updated successfully.', 'success');
        },
        (error) => {
          console.error('Error updating produit:', error);
          Swal.fire('Error!', 'Failed to update produit.', 'error');
        }
      );
    } else if (this.modalMode === 'add') {
      console.log('Adding new item:', updatedProduit);

      this.Service.AddProduit(updatedProduit).subscribe(
        (res) => {
          console.log("Produit created !");
          console.log('produit jdid ----------:', updatedProduit);
          this.GetList();
          Swal.fire('Success!', 'Produit added successfully.', 'success');
        },
        (error) => {
          console.log("Produit not created", error);
          Swal.fire('Error!', 'Failed to add produit.', 'error');
        }
      );
    }
  }


  getCategorieName(categorieId: number): any{
    this.Service.OneCat(categorieId);

  }

  DeleteProduit(IdProduit:any)
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

        this.Service.DeleteProduit(IdProduit).subscribe(
          (res) => {
            console.log('List of Produits:', this.ListProduit);
            this.GetList();


            Swal.fire({
              title: "Deleted!",
              text: "Your file has been deleted.",
              icon: "success"
            });
          },
          (error) => {
            console.log('Error deleting :', error);
            Swal.fire({
              title: "Error",
              text: "There was an error deleting .",
              icon: "error"
            });
          }
        );
      }
    });
  }


//   getSeverity(status: String ) {

//     switch (status) {
//         case '1':
//             return 'success';

//         case '0':
//             return 'danger';
//     }
// }
}
