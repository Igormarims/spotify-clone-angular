import { HomeComponent } from './../home/home.component';
import { PlayerComponent } from './player/player.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes  } from '@angular/router';
import { ListaMusicasComponent } from '../lista-musicas/lista-musicas.component';

 const routes :Routes = [
    {
     path: '', component: PlayerComponent,
     children: [
        {
            path:'home',
            component: HomeComponent
        },
        {
          path:'lista/:tipo/:id',
          component: ListaMusicasComponent
        }
     ]
    }

 ];

@NgModule({
    declarations:[],
    imports: [

    RouterModule.forChild(routes)
    ],
    exports:[RouterModule]
})
export class PlayerRoutingModule {

}
