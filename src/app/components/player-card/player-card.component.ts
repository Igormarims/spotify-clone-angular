import { Component, OnInit, OnDestroy } from '@angular/core';
import { IMusica } from 'src/app/models/IMusica';
import { newMusica } from 'src/app/common/factories';
import { PlayService } from 'src/app/services/play.service';
import { faStepBackward, faStepForward } from '@fortawesome/free-solid-svg-icons';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-player-card',
  templateUrl: './player-card.component.html',
  styleUrls: ['./player-card.component.scss']
})
export class PlayerCardComponent implements OnInit, OnDestroy {

   musica: IMusica = newMusica();
   subs: Subscription[] = [];

   anteriorIcone = faStepBackward;
   proximoIcone = faStepForward;

  constructor(private playerService: PlayService) { }


  ngOnInit(): void {
    this.obterMusicaTocando();
  }

  ngOnDestroy(): void {
     this.subs.forEach( subs=> subs.unsubscribe() )
  }

  obterMusicaTocando() {
  const  sub =  this.playerService.musicaAtual.subscribe((musica: IMusica)=> {
      this.musica = musica;
  })
   this.subs.push(sub)
  }

  voltarMusica() {
    this.playerService.voltarMusica();
  }

  proximaMusica() {
    this.playerService.proximaMusica();
  }

}
