import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Artista } from '../models/artista/artista';

@Injectable({
  providedIn: 'root'
})
export class ArtistaService {

  private url = "localhost:8080/artista/";

  constructor(private http: HttpClient) { }

  get():Observable<Artista[]>{
    return this.http.get<Artista[]>(this.url);
  }
}
