import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ConfirmAccountComponent } from './confirm-account/confirm-account.component';


const routes: Routes = [
  {path:"", component:HomeComponent} ,
  {path:"ConfirmAccount",component:ConfirmAccountComponent},
  { path: "course", loadChildren: () => import('./course-module/course-module.module').then(m => m.CourseModuleModule) },
  { path: 'user', loadChildren: () => import('./user-module/user-module.module').then(m => m.UserModuleModule) },
  { path: 'role', loadChildren: () => import('./role-module/role-module.module').then(m => m.RoleModuleModule) }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
 