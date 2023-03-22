import { IArtista } from '../../models/IArtista';
import { SpotifyService } from 'src/app/services/spotify.service';
import { Component, OnInit } from '@angular/core';
import { newArtista } from 'src/app/common/factories';

@Component({
  selector: 'app-top-artista',
  templateUrl: './top-artista.component.html',
  styleUrls: ['./top-artista.component.scss']
})
export class TopArtistaComponent implements OnInit {

  topArtista: IArtista = newArtista();

  constructor(private spotifyService: SpotifyService) { }

  ngOnInit(): void {
    this.buscarArtista()
  }

  buscarArtista() {
   const artistas = this.spotifyService.buscarTopArtistas(1);
  //  console.log(artistas, 'aaaaaaaaaa');

    if(artistas){
    //  this.topArtista = artistas.pop();
    }
  }

}
