import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class SearchService {

  private url = "http://localhost:8080/search/";

  private getTokenFromCookie(): string | null {
    const match = document.cookie.match(new RegExp('(^| )authorization=([^;]+)'));
    return match ? match[2] : null;
  }

  constructor(private http: HttpClient) { }

  busqueda(term: String): Observable<any> {
    const token = this.getTokenFromCookie();
    let headers = new HttpHeaders();

    if (token) {
      headers = headers.set('Authorization', `Bearer ${token}`);
    }

    // Si tu backend espera un objeto, usa { term }
    // Si espera un string plano, usa solo term
    return this.http.post<any[]>(this.url + 'artistInfo', { term }, { headers });
  }
}
