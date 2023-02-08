import { IMusica } from './../models/IMusica';
import { IPlaylist } from './../models/IPlaylist';
import { IUsuario } from './../models/IUsuario';
import { Injectable } from '@angular/core';
import { SpotifyConfiguration } from 'src/environments/environment';
import  Spotify  from 'spotify-web-api-js';
import { spotifyArtistaParaArtista, spotifyPlaylistParaPlaylist, spotifyTrackParaMusica, spotifyUserParaUsuario } from '../common/spotifyHelper';
import { Router } from '@angular/router';
import { IArtista } from '../models/IArtista';


@Injectable({
  providedIn: 'root'
})
export class SpotifyService {
  
   spotifyApi: Spotify.SpotifyWebApiJs =  null;
   usuario: IUsuario;
   
   
  constructor(private router: Router) { 
    this.spotifyApi = new Spotify();  
    
  }


  async inicializarUsuario() {
    if(this.usuario) {
      return true;
    }

   

   const token = localStorage.getItem('token');
        if(!token){
         
         return false;
       }

       try {
         this.definirAccessToken(token);
         await this.obterSpotifyUsuario()
         
         console.log(this.usuario, 'usuario do sub');
         
        
        //  console.log(this.us, 'US');
         return this.usuario;
         
         
        
       } catch (e) {
        return false;
       }finally{
        console.log(this.usuario, 'usuario spotifyy');
       }

      
       
  }

 async obterSpotifyUsuario() {
    const userInfo = await this.spotifyApi.getMe();
     this.usuario = spotifyUserParaUsuario(userInfo);
    console.log(this.usuario, 'user', userInfo);
    
  }

  obterUrlLogin(): string {
    const authEndpoint = `${SpotifyConfiguration.authEndpoint}?`
    const clientId = `client_id=${SpotifyConfiguration.clientId}&`
    const redirectUrl = `redirect_uri=${SpotifyConfiguration.redirectUrl}&`
    const scopes = `scope=${SpotifyConfiguration.scopes.join('%20')}&` 
    const responseType = `response_type=token&show_dialog=true`
    return `${authEndpoint}${clientId}${redirectUrl}${scopes}${responseType}`
  }
   
  obterTokenUrlCallback() {
     if(!window.location.hash){
       return '';
     }
     const params = window.location.hash.substring(1).split('&')
     return params[0].split('=')[1];
 }

 definirAccessToken(token: string) {
    this.spotifyApi.setAccessToken(token);
    localStorage.setItem('token', token);
    
 }

 async buscarPlaylistUsuario(offset = 0, limit = 50): Promise<IPlaylist[]> {
  const playlists = await this.spotifyApi.getUserPlaylists(this.usuario?.id, { offset, limit });
   console.log(playlists, 'play aqui');
   // esse forma é a mesma do return de baixo
  //  return  playlists.items.map(x => spotifyPlaylistParaPlaylist(x));
return playlists?.items.map(spotifyPlaylistParaPlaylist);
 }

 async buscarTopArtistas(limit = 10): Promise<IArtista[]> {
  const artistas = await this.spotifyApi.getMyTopArtists({limit})
   return artistas.items.map(spotifyArtistaParaArtista);
 }

 async buscarMusicas(offset = 0, limit = 50):Promise<IMusica[]> {
   const musicas = await this.spotifyApi.getMySavedTracks({offset, limit});
   console.log(musicas, 'MUSICAS');
   return   musicas.items.map(x => spotifyTrackParaMusica(x.track));
   
 }

 async executarMusica(musicaId: string) {
    await this.spotifyApi.queue(musicaId);
    await this.spotifyApi.skipToNext();

 }

logout() {
  localStorage.clear();
  this.router.navigate(['/login'])
}


}
