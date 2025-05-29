export class Categoria {
    nombre: string;

    constructor(nombre: string) {
        this.nombre = nombre;
    }

    get nombreCategoria(): string {
        return this.nombre;
    }
    set nombreCategoria(value: string) {
        this.nombre = value;
    }
}
