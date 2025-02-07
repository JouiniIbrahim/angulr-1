import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ConfirmAccountComponent } from './Connexion/confirm-account/confirm-account.component';
import { LoginComponent } from './Connexion/login/login.component';


const routes: Routes = [
  {path:"", component:HomeComponent} ,
  {path:"login",component:LoginComponent},
  {path:"ConfirmAccount",component:ConfirmAccountComponent},
  { path: "course", loadChildren: () => import('./course-module/course-module.module').then(m => m.CourseModuleModule) },
  { path: 'role', loadChildren: () => import('./role-module/role-module.module').then(m => m.RoleModuleModule) },
  { path: 'Administration', loadChildren: () => import('./administration/administration.module').then(m => m.AdministrationModule) },
  { path: 'Market', loadChildren: () => import('./market/market.module').then(m => m.MarketModule) },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
