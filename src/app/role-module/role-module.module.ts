import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RoleModuleRoutingModule } from './role-module-routing.module';
import { RoleModuleComponent } from './role/role-module.component';



@NgModule({
  declarations: [
    RoleModuleComponent
  ],
  imports: [
    CommonModule,
    RoleModuleRoutingModule
  ]
})
export class RoleModuleModule { }
