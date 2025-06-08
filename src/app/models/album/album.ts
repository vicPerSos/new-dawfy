import { Artista } from "../artista/artista";
import { Cancion } from "../cancion/cancion";

export class Album {
    id?: number;
    nombre: string;
    fechaLanzamiento: Date;
    artista: Artista;
    cancion: Cancion[];
    imagen: string;

    constructor(nombre: string, fechaLanzamiento: Date, artista: Artista, cancion: Cancion[], imagen: string = '') {
        this.nombre = nombre;
        this.fechaLanzamiento = fechaLanzamiento;
        this.artista = artista;
        this.cancion = cancion;
        this.imagen = imagen;
    }

    get idAlbum(): number | undefined {
        return this.id;
    }

    set idAlbum(value: number | undefined) {
        this.id = value;
    }

    get nombreAlbum(): string {
        return this.nombre;
    }

    set nombreAlbum(value: string) {
        this.nombre = value;
    }

    get fechaLanzamientoAlbum(): Date {
        return this.fechaLanzamiento;
    }

    set fechaLanzamientoAlbum(value: Date) {
        this.fechaLanzamiento = value;
    }

    get artistaAlbum(): Artista {
        return this.artista;
    }

    set artistaAlbum(value: Artista) {
        this.artista = value;
    }

    get cancionAlbum(): Cancion[] {
        return this.cancion;
    }

    set cancionAlbum(value: Cancion[]) {
        this.cancion = value;
    }

    get imagenAlbum(): string {
        return this.imagen;
    }

    set imagenAlbum(value: string) {
        this.imagen = value;
    }
}