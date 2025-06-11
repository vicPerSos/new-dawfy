import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Artista } from '../models/artista/artista';

@Injectable({
  providedIn: 'root'
})
export class ArtistaService {

  private url = "http://localhost:8080/artista";

  constructor(private http: HttpClient) { }
  private getTokenFromCookie(): string | null {
    const match = document.cookie.match(new RegExp('(^| )authorization=([^;]+)'));
    console.log('Token encontrado en la cookie:', match ? match[2] : 'No se encontró token');
    return match ? match[2] : null;
  }
  getMe(): Observable<Artista> {
    const token = this.getTokenFromCookie();
    let headers = new HttpHeaders();

    if (token) {
      headers = headers.set('Authorization', `Bearer ${token}`);
    }
    return this.http.get<Artista>(this.url + "/me", { headers });
  }
  getArtistasByCategoria(categoria: string): Observable<Artista[]> {
    const token = this.getTokenFromCookie();
    let headers = new HttpHeaders();

    if (token) {
      headers = headers.set('Authorization', `Bearer ${token}`);
    }

    return this.http.get<Artista[]>(this.url + `/categoria/${categoria}`, { headers });
  }
  // artista.service.ts
  get(): Observable<Artista[]> {
    const token = this.getTokenFromCookie();
    let headers = new HttpHeaders();

    if (token) {
      headers = headers.set('Authorization', `Bearer ${token}`);
    }

    return this.http.get<Artista[]>(this.url, { headers });
  }

}
