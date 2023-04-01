import { IMusica } from './../models/IMusica';
import { IArtista } from "../models/IArtista";
import { IPlaylist } from '../models/IPlaylist';

export function newArtista(): IArtista {
    return {
        id: '',
        nome: '',
        imagemUrl: '',
        musicas: []
    };
}

export function newMusica():IMusica {
  return {
    id: '',
    album: {
        id: '',
        nome: '',
        ImagemUrl: ''
    },
    artistas: [],
    tempo: '',
    titulo: ''
  }
}

export function newPLaylist(): IPlaylist {
  return {
    id: '',
    imagemUrl: '',
    nome: '',
    musicas: []
  }
}
