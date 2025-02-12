import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ConnexionServiceService} from "../connexion/services/connexion-service.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {


  constructor(
    private Service:ConnexionServiceService, private router: Router
  )
  {  }

  ngOnInit(): void {

  }

  logout(): void {
    this.Service.Signout().subscribe(
      response => {
        console.log('User signed out');


        sessionStorage.removeItem('authToken');



        this.router.navigate(['/login']);
      },
      error => {
        console.error('Signout error:', error);
      }
    );
  }
}
