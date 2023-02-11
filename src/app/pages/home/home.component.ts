import { PlayService } from './../../services/play.service';
import { IArtista } from './../../models/IArtista';
import { IMusica } from './../../models/IMusica';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { SpotifyService } from 'src/app/services/spotify.service';
import { faPlay } from '@fortawesome/free-solid-svg-icons';
import { newMusica } from 'src/app/common/factories';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy {
  
  musicas: any = [];
  musicasComArtistas: IMusica[] = [];
  musicaAtual: IMusica = newMusica();
  subs: Subscription[] = [];
  //Icone
  playIcone = faPlay

  constructor(private sportifyService: SpotifyService, 
    private playService: PlayService) { }
 
  ngOnInit(): void {
    this.obterMusicas();
    this.obterMusicaAtual();
  }

  ngOnDestroy(): void {
    this.subs.forEach(sub => sub.unsubscribe())
  }


 async  obterMusicas() {
  this.musicas = await this.sportifyService.buscarMusicas();
  
  this.musicasComArtistas = this.musicas.map((musica: IMusica) => {
    return {
      ...musica,
      artistasString: this.obterArtistas(musica)
    };
   });
 }

 obterMusicaAtual() {
 const sub =  this.playService.musicaAtual.subscribe( musica =>{
      this.musicaAtual = musica
  })
  this.subs.push(sub)
 }

obterArtistas(musica: IMusica) {
  return musica.artistas.map(artista => artista.nome).join(', ');
}

executarMusica(musica: IMusica) {
  this.sportifyService.executarMusica(musica.id);
   this.playService.definirMusicaAtual(musica);
}

}
