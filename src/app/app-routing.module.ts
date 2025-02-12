import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ConfirmAccountComponent } from './connexion/confirm-account/confirm-account.component';
import { LoginComponent } from './connexion/login/login.component';


const routes: Routes = [
  {path:"", component:HomeComponent} ,
  {path:"login",component:LoginComponent},
  {path:"ConfirmAccount",component:ConfirmAccountComponent},
  { path: "course", loadChildren: () => import('./course-module/course-module.module').then(m => m.CourseModuleModule) },
  { path: 'role', loadChildren: () => import('./role-module/role-module.module').then(m => m.RoleModuleModule) },
  { path: 'Administration', loadChildren: () => import('./administration/administration.module').then(m => m.AdministrationModule) },
  { path: 'Market', loadChildren: () => import('./market/market.module').then(m => m.MarketModule) },
  { path: 'connexion', loadChildren: () => import('./connexion/connexion.module').then(m => m.ConnexionModule) },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
