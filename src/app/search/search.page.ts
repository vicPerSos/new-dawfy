import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Subject, of } from 'rxjs';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';
import { SearchDTO } from '../models/dtos/searchDTO';
import { SearchService } from '../service/search.service'; // Ajusta la ruta si es necesario
import { Cancion } from '../models/cancion/cancion';
import { Album } from '../models/album/album';
import { Artista } from '../models/artista/artista';


@Component({
  selector: 'app-search',
  templateUrl: 'search.page.html',
  styleUrls: ['search.page.scss'],
  standalone: false,
})
export class SearchPage {
  viewMode: 'songs' | 'albums' | 'artists' = 'albums';
  results: SearchDTO = new SearchDTO([], [], []);
  searchTerm: string = '';
  private searchSubject = new Subject<string>();

  constructor(private searchService: SearchService, private http: HttpClient) { }

  ngOnInit() {
    this.searchSubject.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      switchMap(term => {
        if (!term.trim()) {
          // Si el buscador está vacío, no hacemos nada
          return of(null);
        }
        // Llamada a la API
        return this.searchService.busqueda(term);
      })
    ).subscribe({
      next: (res) => {
        if (res) {
          // Mapear canciones
          const canciones = (res.canciones ?? []).map(
            (c: any) => new Cancion(
              c.nombre,
              c.duracion,
              c.imagen,
              c.url,
              c.categorias,
              c.colaboradores
            )
          );

          // Mapear álbumes (ajusta según tu constructor de Album)
          const albumes = (res.albums ?? []).map(
            (a: any) => new Album(
              a.nombre,
              a.fechaLanzamiento,
              a.artista,
              a.cancion,
              a.imagen
            )
          );

          // Mapear artistas (ajusta según tu constructor de Artista)
          const artistas = (res.artistas ?? []).map(
            (ar: any) => new Artista(
              ar.nombre,
              ar.fechaNacimiento,
              ar.correo,
              ar.pais,
              ar.foto
            )
          );

          this.results = new SearchDTO(canciones, albumes, artistas);
          console.log('Resultados mapeados:', this.results);
        }
      },
      error: (err) => {
        console.error('Error en la búsqueda:', err);
      }
    });
  }

  logAlbum(album: any, i: number) {
    console.log('Álbum', i, album);
    return '';
  }

  onSearchInput() {
    this.searchSubject.next(this.searchTerm);
  }
  formatDuration(ms: number): string {
    const totalSeconds = Math.floor(ms / 1000);
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    // Asegura que los segundos siempre tengan dos dígitos
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  }
}
