import { Router } from '@angular/router';
import { SpotifyService } from './../../services/spotify.service';
import { IPlaylist } from './../../models/IPlaylist';
import { Component, OnInit } from '@angular/core';
import { faGuitar, faHome, faMusic, faSearch } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-painel-esquerdo',
  templateUrl: './painel-esquerdo.component.html',
  styleUrls: ['./painel-esquerdo.component.scss']
})
export class PainelEsquerdoComponent implements OnInit {

  menuSelecionado = '';

  playlist: IPlaylist[] = [];

  // Icons
  homeIcone = faHome;
  pesquisarIcone = faSearch
  artistaIcone = faGuitar
  playlistIcone = faMusic

  constructor(private spotifyService: SpotifyService,
              private router: Router) { }

  ngOnInit(): void {
    this.buscarPlaylists();
  }

   botaoClick(botao: string) {
     this.menuSelecionado = botao;
     this.router.navigateByUrl('player/home')
    }

 async  buscarPlaylists() {
    this.playlist = await this.spotifyService.buscarPlaylistUsuario();
    // console.log(this.playlist, 'playlist do back');

   }
}
