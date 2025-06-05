import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private apiUrl = 'http://localhost:8080/usuario/role';

  constructor(private http: HttpClient) { }

  // Ejemplo de cómo obtener el token de la cookie
  private getTokenFromCookie(): string | null {
    const matches = document.cookie.match('(^|;)\\s*authorization\\s*=\\s*([^;]+)');
    return matches ? matches.pop() : null;
  }

  getUserRole(): Observable<string> {
    const token = this.getTokenFromCookie();
    let headers = new HttpHeaders();

    if (token) {
      headers = headers.set('Authorization', `Bearer ${token}`);
    }

    return this.http.get<string>(this.apiUrl, { headers });
  }
}
