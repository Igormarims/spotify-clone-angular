import { IPlaylist } from './../models/IPlaylist';
import { IUsuario } from './../models/IUsuario';


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