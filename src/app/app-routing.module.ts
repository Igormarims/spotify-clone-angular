import { AutenticadoGuard } from './guards/autenticado.guard';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {path:'', redirectTo: 'player',pathMatch: 'full'},
  {
   path: 'login', 
  loadChildren: ()=> import('../app/pages/login/login.module').then( m =>m.LoginModule )
  },
  {
   path: 'player',
   loadChildren: ()=> import('../app/pages/player/player.module').then(m => m.PlayerModule),
   canLoad:[ AutenticadoGuard]
   }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
