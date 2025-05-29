export class Artista {
    nombre: string;
    nacionalidad: string;
    fechaNacimiento: Date;
    id: number;
    correo: string;
    pais: string;
    foto: string;

    constructor(nombre: string, nacionalidad: string, fechaNacimiento: Date, id: number, correo: string, pais: string, foto: string) {
        this.nombre = nombre;
        this.nacionalidad = nacionalidad;
        this.fechaNacimiento = fechaNacimiento;
        this.id = id;
        this.correo = correo;
        this.pais = pais;
        this.foto = foto;
    }
    get idArtista(): number {
        return this.id;
    }
    set idArtista(value: number) {
        this.id = value;
    }
    get correoArtista(): string {
        return this.correo;
    }
    set correoArtista(value: string) {
        this.correo = value;
    }
    get paisArtista(): string {
        return this.pais;
    }
    set paisArtista(value: string) {
        this.pais = value;
    }
    get fotoArtista(): string {
        return this.foto;
    }
    set fotoArtista(value: string) {
        this.foto = value;
    }

    get nombreArtista(): string {
        return this.nombre;
    }
    set nombreArtista(value: string) {
        this.nombre = value;
    }

    get nacionalidadArtista(): string {
        return this.nacionalidad;
    }
    set nacionalidadArtista(value: string) {
        this.nacionalidad = value;
    }

    get fechaNacimientoArtista(): Date {
        return this.fechaNacimiento;
    }
    set fechaNacimientoArtista(value: Date) {
        this.fechaNacimiento = value;
    }
}