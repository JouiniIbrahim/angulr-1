import { Component, OnInit } from '@angular/core';
import { AllMyServicesService } from "../Services/all-my-services.service";
import { forkJoin, of } from "rxjs";
import { catchError } from "rxjs/operators";

@Component({
  selector: 'app-test-rx-js',
  templateUrl: './test-rx-js.component.html',
  styleUrls: ['./test-rx-js.component.scss']
})
export class TestRxJSComponent implements OnInit {

  users: any[] = [];
  products: any[] = [];
  categories: any[] = [];
  roles: any[] = [];
  loading: boolean = true;
  isModalVisible: boolean = false;
  errorMessages: string[] = [];  // To store the error messages

  constructor(private Service: AllMyServicesService) { }

  ngOnInit(): void {
    this.loadData();
  }

  loadData(): void {
    forkJoin([
      this.Service.AllUsers1().pipe(
        catchError(error => {
          this.errorMessages.push('Error fetching users');
          return of([]); // Return an empty array or a fallback value
        })
      ),
      this.Service.AllProduits1().pipe(
        catchError(error => {
          this.errorMessages.push('Error fetching products');
          return of([]); // Return an empty array or a fallback value
        })
      ),
      this.Service.AllCats1().pipe(
        catchError(error => {
          this.errorMessages.push('Error fetching categories');
          return of([]); // Return an empty array or a fallback value
        })
      ),
      this.Service.AllRoles1().pipe(
        catchError(error => {
          this.errorMessages.push('Error fetching roles');
          return of([]); // Return an empty array or a fallback value
        })
      )
    ]).subscribe({
      next: ([users, products, categories, roles]) => {
        this.users = users;
        this.products = products;
        this.categories = categories;
        this.roles = roles;
        this.loading = false;
      },
      error: (error) => {
        console.error('Error fetching data', error);
        this.loading = false;
      }
    } );
  }

  toggleModal() {
    this.isModalVisible = !this.isModalVisible;
  }

}
