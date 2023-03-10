import { BuscasRecentesComponent } from './../../components/buscas-recentes/buscas-recentes.component';
import { PainelDireitoComponent } from './../../components/painel-direito/painel-direito.component';
import { TopArtistaComponent } from './../../components/top-artista/top-artista.component';
import { HomeComponent } from './../home/home.component';
import { RodapeUsuarioComponent } from './../../components/rodape-usuario/rodape-usuario.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { BotaoMenuComponent } from './../../components/botao-menu/botao-menu.component';
import { PainelEsquerdoComponent } from './../../components/painel-esquerdo/painel-esquerdo.component';
import { PlayerRoutingModule } from './player.routing.module';
import { PlayerComponent } from './player/player.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SpotifyService } from 'src/app/services/spotify.service';
import { FormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    PlayerComponent,
    PainelEsquerdoComponent,
    BotaoMenuComponent,
    RodapeUsuarioComponent,
    HomeComponent,
    TopArtistaComponent,
    PainelDireitoComponent,
    BuscasRecentesComponent
  ],
  imports: [
    CommonModule,
    PlayerRoutingModule,
    FontAwesomeModule,
    FormsModule
  ],
  providers:[SpotifyService]
})
export class PlayerModule { }
