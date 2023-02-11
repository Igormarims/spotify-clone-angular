import { IArtista } from './IArtista';

export interface IMusica {
    id: string;
    titulo: string;
    artistas: {id: string, nome:string}[];
    album: {
        id: string,
        nome: string,
        ImagemUrl: string
    };
    tempo: string;
    artistasString?: IMusica[]
}