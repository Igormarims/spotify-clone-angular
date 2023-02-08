import { IArtista } from './../../models/IArtista';
import { IMusica } from './../../models/IMusica';
import { Component, OnInit } from '@angular/core';
import { SpotifyService } from 'src/app/services/spotify.service';
import { faPlay } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  
  musicas: IMusica[] = [];

  //Icone
  playIcone = faPlay

  constructor(private sportifyService: SpotifyService) { }

  ngOnInit(): void {
    this.obterMusicas();
  }

 async  obterMusicas() {
  this.musicas = await this.sportifyService.buscarMusicas();
 }

obterArtistas(musica: IMusica) {
  return musica.artistas.map(artista => artista.nome).join(', ');
}

}
