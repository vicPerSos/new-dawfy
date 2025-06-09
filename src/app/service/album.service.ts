import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Album } from '../models/album/album';
import { AlbumRequestBodyPOST } from '../models/album/albumRequestBody';

@Injectable({
  providedIn: 'root'
})
export class AlbumService {
  private apiUrl = 'http://localhost:8080/albums';
  constructor(private http: HttpClient) { }

  private getTokenFromCookie(): string | null {
    const match = document.cookie.match(new RegExp('(^| )authorization=([^;]+)'));
    console.log('Token encontrado en la cookie:', match ? match[2] : 'No se encontró token');
    return match ? match[2] : null;
  }

  getMisAlbumes(): Observable<any[]> {
    const token = this.getTokenFromCookie();
    let headers = new HttpHeaders();

    if (token) {
      headers = headers.set('Authorization', `Bearer ${token}`);
    }


    return this.http.get<any[]>(this.apiUrl + '/artista', { headers });
  }

  getMisAlbumesFromApi(): Observable<any[]> {
    const token = this.getTokenFromCookie();
    let headers = new HttpHeaders();

    if (token) {
      headers = headers.set('Authorization', `Bearer ${token}`);
    }


    return this.http.get<any[]>(this.apiUrl + '/artistaUsername', { headers });
  }

  postAlbum(album: AlbumRequestBodyPOST) {
    const token = this.getTokenFromCookie();
    let headers = new HttpHeaders();

    if (token) {
      headers = headers.set('Authorization', `Bearer ${token}`);
    }
    return this.http.post('http://localhost:8080/albums', album, { headers });
  }

  postCancion(cancion: any): Observable<any> {
    const token = this.getTokenFromCookie?.();
    let headers = new HttpHeaders();

    if (token) {
      headers = headers.set('Authorization', `Bearer ${token}`);
    }
    // Envía el objeto cancion como body
    return this.http.post('http://localhost:8080/cancion', cancion, { headers });
  }


}
