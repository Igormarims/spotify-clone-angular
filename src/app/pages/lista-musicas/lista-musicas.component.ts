import { Component, OnInit, OnDestroy } from '@angular/core';
import { newMusica } from 'src/app/common/factories';
import { IMusica } from './../../models/IMusica';
import { faPlay } from '@fortawesome/free-solid-svg-icons';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { SpotifyService } from './../../services/spotify.service';
import { PlayService } from 'src/app/services/play.service';


@Component({
  selector: 'app-lista-musicas',
  templateUrl: './lista-musicas.component.html',
  styleUrls: ['./lista-musicas.component.scss']
})
export class ListaMusicasComponent implements OnInit, OnDestroy {

  bannerImagemUrl = '';
  bannerTexto = '';

  titulo = '';



  musicas: IMusica[] = [];
  musicasComArtistas: { artistasString: string; id: string; titulo: string; artistas: { id: string; nome: string; }[]; album: { id: string; nome: string; ImagemUrl: string; }; tempo: string; }[] = [];
  musicaAtual: IMusica = newMusica()
  playIcone = faPlay;
  subs: Subscription[] = [];

  constructor(
     private activatedRouter: ActivatedRoute,
     private spotifyService: SpotifyService,
     private playService: PlayService
     ) { }


  ngOnInit(): void {
    this.obterMusicas();
    this.obterMusicaAtual();

  }

  ngOnDestroy(): void {
     this.subs.forEach(sub => sub.unsubscribe());
   }



 async obterMusicas() {
  const sub =  this.activatedRouter.paramMap
       .subscribe(async params => {
         const tipo = params.get('tipo');
         const id =  params.get('id');
        await  this.obterDadosPagina(tipo, id)
      });

        this.subs.push(sub);
      }

   async obterDadosPagina(tipo: string, id: string) {
       if(tipo === 'playlist'){
          await this.obterDadosPlaylist(id);
       } else {
        await this.obterDadosArtistas(id);
       }


   }

   obterMusicaAtual() {
    this.playService.musicaAtual.subscribe(musica => {
      this.musicaAtual = musica;
    })
   }

   async obterDadosPlaylist(playlistId: string) {
      const playlistMusicas = await this.spotifyService.buscarMusicasPlaylist(playlistId);
      this.definirDadosPagina(playlistMusicas.nome, playlistMusicas.imagemUrl, playlistMusicas.musicas);
      this.titulo = 'Musica Playlist: ' + playlistMusicas.nome;
   }

   async obterDadosArtistas(artistaId: string) {

   }

    definirDadosPagina(bannerText: string, bannerImage: string, musicas: IMusica[]) {
        this.bannerImagemUrl = bannerImage;
        this.bannerTexto = bannerText;
        this.musicas = musicas;
    }

    executarMusica(musica: IMusica) {
      console.log('essa é a musica ', musica.id, );
      console.log('essa é a atual ', this.musicaAtual.id, );

      this.spotifyService.executarMusica(musica.id);
       this.playService.definirMusicaAtual(musica);


    }

    async obterMusicass() {
      this.musicas = await this.spotifyService.buscarMusicas();

      this.musicasComArtistas = this.musicas.map((musica: IMusica) => {
        return {
          ...musica,
          artistasString: this.obterArtistas(musica)
        };
       });
     }

     obterArtistas(musica: IMusica) {
      return musica.artistas.map(artista => artista.nome).join(', ');
    }

}
