import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SpotifyService {
  private apiUrl = 'http://localhost:8080'; // Cambia por tu URL real
  private getTokenFromCookie(): string | null {
    const match = document.cookie.match(new RegExp('(^| )authorization=([^;]+)'));
    console.log('Token encontrado en la cookie:', match ? match[2] : 'No se encontró token');
    return match ? match[2] : null;
  }

  constructor(private http: HttpClient) { }

  getAlbumsDeSpotify(): Observable<{ albums: any[] }> {
    const token = this.getTokenFromCookie();
    let headers = new HttpHeaders();

    if (token) {
      headers = headers.set('Authorization', `Bearer ${token}`);
    }
    // El return es igual, solo cambia el tipo declarado
    return this.http.get<{ albums: any[] }>(`${this.apiUrl}/albums/artista`, { headers });
  }

  getCancionesDeAlbum(albumId: string): Observable<any[]> {
    const token = this.getTokenFromCookie(); // Asegúrate de que este método existe y funciona
    let headers = new HttpHeaders();

    if (token) {
      headers = headers.set('Authorization', `Bearer ${token}`);
    } else {
      throw new Error('No se encontró el token de autenticación de Spotify.');
    }

    return this.http.get<any>(`http://localhost:8080/cancion/album/${albumId}`, { headers }).pipe(
      map(response => response.items ?? []),
      catchError(() => of([])) // Si hay error, devuelve array vacío
    );
  }

}
