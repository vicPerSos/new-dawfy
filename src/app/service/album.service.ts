import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AlbumService {


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

    return this.http.get<any[]>('http://localhost:8080/albumes/mis-albumes', { headers });
  }
}
