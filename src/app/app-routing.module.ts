import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {path:'', redirectTo: 'login',pathMatch: 'full'},
  {path: 'login', loadChildren: ()=> import('../app/pages/login/login.module').then( m =>m.LoginModule )}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }