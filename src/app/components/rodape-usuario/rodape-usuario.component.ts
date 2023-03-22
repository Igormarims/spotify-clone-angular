import { SpotifyService } from './../../services/spotify.service';
import { IUsuario } from './../../models/IUsuario';
import { Component, OnInit } from '@angular/core';
import { faSignOutAlt } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-rodape-usuario',
  templateUrl: './rodape-usuario.component.html',
  styleUrls: ['./rodape-usuario.component.scss']
})
export class RodapeUsuarioComponent implements OnInit {

   sairIcone = faSignOutAlt;
   usuario?: IUsuario | any;


  constructor(private spotifyService: SpotifyService ) { }

  ngOnInit(): void {
    this.spotifyService.inicializarUsuario().then(usuario => {
      this.usuario = usuario;
    });
  }

 logout() {
  // console.log('fun');

  this.spotifyService.logout();
 }



}

