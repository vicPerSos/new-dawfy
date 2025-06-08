export interface AlbumView {
    id: string;
    nombre: string;
    imagen: string;
    fechaLanzamiento: string;
    totalCanciones: number;
    tipo: string;
    // Puedes añadir más campos si lo necesitas
    // artista?: string; // NO lo incluyas aquí, según tu requerimiento
}