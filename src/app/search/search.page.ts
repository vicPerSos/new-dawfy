import { Component } from '@angular/core';
import { SearchService } from '../service/search.service'; // Ajusta la ruta si es necesario
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';
import { Observable, Subject, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-search',
  templateUrl: 'search.page.html',
  styleUrls: ['search.page.scss'],
  standalone: false,
})
export class SearchPage {
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
