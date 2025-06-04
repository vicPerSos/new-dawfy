import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { SearchDTO } from '../models/dtos/searchDTO';


@Injectable({
  providedIn: 'root'
})
export class SearchService {

  private url = "http://localhost:8080/search/";

  private getTokenFromCookie(): string | null {
    const match = document.cookie.match(new RegExp('(^| )authorization=([^;]+)'));
    console.log('Token encontrado en la cookie:', match ? match[2] : 'No se encontró token');
    return match ? match[2] : null;
  }

  constructor(private http: HttpClient) { }

  busqueda(term: string): Observable<any> {
    const token = this.getTokenFromCookie();
    let headers = new HttpHeaders();

    if (token) {
      headers = headers.set('Authorization', `Bearer ${token}`);
    }

    const url = `${this.url}${encodeURIComponent(term)}`;

    // Construye el cURL
    const curl = [
      `curl -X GET '${url}' \\`,
      `-H "Authorization: Bearer ${token}"`
    ].join('\n');

    console.log('CURL para probar en Postman o terminal:\n' + curl);

    // Hace la petición GET
    return this.http.get<any>(url, { headers });
  }


}
