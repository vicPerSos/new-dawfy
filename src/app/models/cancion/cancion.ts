import { Categoria } from "../categoria/categoria";

export class Cancion {
    nombre: String;
    duracion: number;
    imagen: String;
    url: String;
    categorias: Array<Categoria>;
    colaboradores: Array<String>;

    constructor(nombre: String, duracion: number, imagen: String, url: String, categorias: Array<Categoria>, colaboradores: Array<String>) {
        this.nombre = nombre;
        this.duracion = duracion;
        this.imagen = imagen;
        this.url = url;
        this.categorias = categorias;
        this.colaboradores = colaboradores;
    }
    get nombreCancion(): String {
        return this.nombre;
    }
    set nombreCancion(value: String) {
        this.nombre = value;
    }
    get duracionCancion(): number {
        return this.duracion;
    }
    set duracionCancion(value: number) {
        this.duracion = value;
    }
    get imagenCancion(): String {
        return this.imagen;
    }
    set imagenCancion(value: String) {
        this.imagen = value;
    }
    get urlCancion(): String {
        return this.url;
    }
    set urlCancion(value: String) {
        this.url = value;
    }
    get categoriasCancion(): Array<Categoria> {
        return this.categorias;
    }
    set categoriasCancion(value: Array<Categoria>) {
        this.categorias = value;
    }
    get colaboradoresCancion(): Array<String> {
        return this.colaboradores;
    }
    set colaboradoresCancion(value: Array<String>) {
        this.colaboradores = value;
    }
}