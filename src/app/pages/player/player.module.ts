import { PainelEsquerdoComponent } from './../../components/painel-esquerdo/painel-esquerdo.component';
import { PlayerRoutingModule } from './player.routing.module';
import { PlayerComponent } from './player/player.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';



@NgModule({
  declarations: [
    PlayerComponent,
    PainelEsquerdoComponent
  ],
  imports: [
    CommonModule,
    PlayerRoutingModule
  ]
})
export class PlayerModule { }
