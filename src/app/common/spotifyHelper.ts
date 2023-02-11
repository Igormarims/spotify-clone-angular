import { newMusica } from 'src/app/common/factories';
import { IMusica } from './../models/IMusica';
import { IArtista } from './../models/IArtista';
import { IPlaylist } from './../models/IPlaylist';
import { IUsuario } from './../models/IUsuario';
import { addMilliseconds, format } from 'date-fns';


export function spotifyUserParaUsuario(user: SpotifyApi.CurrentUsersProfileResponse):IUsuario {
    let obj =   {
        id: user?.id,
        nome: user?.display_name,
        imagemUrl: user?.images.pop()?.url
    }

    console.log(obj, 'log obj');
    

    return obj;
}


export function spotifyPlaylistParaPlaylist(playlist: SpotifyApi.PlaylistObjectSimplified): IPlaylist {
    return {
        id: playlist.id,
        nome: playlist.name,
        imagemUrl: playlist.images.pop()?.url
    }
}

export function spotifyArtistaParaArtista(spotifyArtista: SpotifyApi.ArtistObjectFull):IArtista {
    return {
        id:spotifyArtista.id,
        imagemUrl: spotifyArtista.images.sort((a,b)=> a.width - b.width).pop().url,
        nome: spotifyArtista.name
    }
}

export function spotifyTrackParaMusica(spotifyTrack: SpotifyApi.TrackObjectFull):IMusica {
       
    if(!spotifyTrack)
    return newMusica();

    const msParaMinutos = (ms: number) => {
         const data = addMilliseconds(new Date(0),ms)
         return format(data, 'mm:ss')
    }
   
   
    return {
        id: spotifyTrack.uri,
        titulo: spotifyTrack.name,
        album: {
            id: spotifyTrack.id,
            ImagemUrl: spotifyTrack.album.images.shift().url,
            nome: spotifyTrack.album.name
        },
        artistas: spotifyTrack.artists.map(artistas => ({
            id: artistas.id,
            nome: artistas.name
        })),
        tempo: msParaMinutos(spotifyTrack.duration_ms)
    }
}