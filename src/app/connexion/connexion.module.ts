import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ConnexionRoutingModule } from './connexion-routing.module';
import {LoginComponent} from "./login/login.component";
import {ConfirmAccountComponent} from "./confirm-account/confirm-account.component";
import {ReactiveFormsModule} from "@angular/forms";
import { SignoutComponent } from './signout/signout.component';


@NgModule({
  declarations: [
    LoginComponent,
    ConfirmAccountComponent,
    SignoutComponent

  ],
  imports: [
    CommonModule,
    ConnexionRoutingModule,
    ReactiveFormsModule
  ]
})
export class ConnexionModule { }
