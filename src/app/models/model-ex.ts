   

   export interface Artista {

     external_urls: string;
     id: string;
     name: string;
     type: string;
     uri: string;

   }

   export interface Track {
     album: {},
     artists: Artista[];
     id: string;
     nome: string;

   }

  