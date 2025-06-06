import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private apiUrl = 'http://localhost:8080/usuario/role';

  constructor(private http: HttpClient) { }

  // Obtiene el token de la cookie (retorna string o null, nunca undefined)
  private getTokenFromCookie(): string | null {
    const matches = document.cookie.match('(^|;)\\s*authorization\\s*=\\s*([^;]+)');
    const token = matches ? matches.pop() : null;
    return typeof token === 'string' ? token : null;
  }

  // Hace la petición para obtener el rol del usuario
  getUserRole(): Observable<string> {
    const token = this.getTokenFromCookie();
    console.log('Token usado:', token);
    let headers = new HttpHeaders();
    if (token) {
      headers = headers.set('Authorization', `Bearer ${token}`);
    }
    console.log('Llamando a', this.apiUrl, 'con headers:', headers);
    return this.http.get(this.apiUrl, { headers, responseType: 'text' });
  }
}
