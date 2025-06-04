import { Album } from "../album/album";
import { Artista } from "../artista/artista";
import { Cancion } from "../cancion/cancion";

export class SearchDTO {
    public canciones: Cancion[];
    public albumes: Album[];
    public artistas: Artista[];

    constructor(canciones: Cancion[], albumes: Album[], artistas: Artista[]) {
        this.canciones = canciones;
        this.albumes = albumes;
        this.artistas = artistas;
    }

    get cancionesDTO(): Cancion[] {
        return this.canciones;
    }

    set cancionesDTO(value: Cancion[]) {
        this.canciones = value;
    }

    get albumesDTO(): Album[] {
        return this.albumes;
    }

    set albumesDTO(value: Album[]) {
        this.albumes = value;
    }

    get artistasDTO(): Artista[] {
        return this.artistas;
    }

    set artistasDTO(value: Artista[]) {
        this.artistas = value;
    }
}