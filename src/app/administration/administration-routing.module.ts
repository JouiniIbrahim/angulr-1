import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {UserComponent} from "./gestion-utilisateur/user/user.component";

const routes: Routes = [{
  path: 'user',
  component: UserComponent,
  children: [
  //  { path: '', component:  },
 //   { path: '', component:  },
  ]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdministrationRoutingModule { }
