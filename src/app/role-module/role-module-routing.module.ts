import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RoleModuleComponent } from './role/role-module.component';


const routes: Routes = [{ path: '', component: RoleModuleComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RoleModuleRoutingModule { }
