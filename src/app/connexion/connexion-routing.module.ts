import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {ConfirmAccountComponent} from "./confirm-account/confirm-account.component";
import {LoginComponent} from "./login/login.component";

const routes: Routes = [
  { path: 'confirmaccount', component:ConfirmAccountComponent  },
  { path: 'login', component:LoginComponent  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ConnexionRoutingModule { }
