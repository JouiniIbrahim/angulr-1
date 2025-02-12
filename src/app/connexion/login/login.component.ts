import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import Swal from "sweetalert2";
import {ConnexionServiceService} from "../services/connexion-service.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  token:any;

  constructor(private fb: FormBuilder,
              private Service:ConnexionServiceService,
              private router: Router
  )
  {  this.loginForm = this.fb.group({
    username: ['', [Validators.required]],
    password: ['', [Validators.required, Validators.minLength(8)]]
  });}

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required, Validators.minLength(8)]]
    });
  }

  get email() {
    return this.loginForm.get('username');
  }

  get password() {
    return this.loginForm.get('password');
  }

  onSubmit(): void {
    if (this.loginForm.valid) {
      const formData = this.loginForm.value;

      const loginData = {
        username: formData.username,
        password: formData.password,



      };

      console.log('Form Submitted', formData);

      this.Service.login(loginData).subscribe(
        (response) => {
          console.log('login done', response);

          // @ts-ignore
          var {token} = response;
          console.log("aaaaaaaaaaaaaa",token);
          sessionStorage.setItem('authToken', token);

          Swal.fire({
            title: "logged in successfully!",
            text: ("welcome "+loginData.username+" !"),
            icon: "success"
          });

          this.router.navigate(['']);
        },
        (error) => {
          Swal.fire({
            title: "Oops...",
            text: "check your credentials !",
            icon: "error"
          });
          console.error('Error login to account', error);
        }
      );
    } else {
      console.log('Form is invalid');
    }
    }

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

