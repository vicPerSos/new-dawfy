import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Subject, of } from 'rxjs';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';
import { SearchService } from '../service/search.service'; // Ajusta la ruta si es necesario
import { SearchDTO } from '../models/dtos/searchDTO';

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
          console.log('Resultados de búsqueda:', res);
          this.results = new SearchDTO(
            res.canciones ?? [],
            res.albums ?? [],   // OJO: aquí mapeas "albums" a "albumes"
            res.artistas ?? []);
          console.log('Resultados mapeados:', this.results);
        }
      },
      error: (err) => {
        console.error('Error en la búsqueda:', err);
      }
    });
  }

  onSearchInput() {
    this.searchSubject.next(this.searchTerm);
  }
}
