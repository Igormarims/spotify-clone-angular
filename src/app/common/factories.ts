import { IMusica } from './../models/IMusica';
import { IArtista } from "../models/IArtista";

export function newArtista(): IArtista {
    return {
        id: '',
        nome: '',
        imagemUrl: ''
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