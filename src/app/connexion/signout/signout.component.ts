import { Component } from '@angular/core';

import { Router } from '@angular/router';
import {ConnexionServiceService} from "../services/connexion-service.service";

@Component({
  selector: 'app-signout',
  templateUrl: './signout.component.html',
  styleUrls: ['./signout.component.scss']
})
export class SignoutComponent {

  constructor(private Service: ConnexionServiceService, private router: Router) { }


  logout(): void {
    this.Service.Signout().subscribe(
      response => {
        console.log('User signed out:', response);


        sessionStorage.removeItem('authToken');



        this.router.navigate(['/login']);
      },
      error => {
        console.error('Signout error:', error);
      }
    );
  }
}
