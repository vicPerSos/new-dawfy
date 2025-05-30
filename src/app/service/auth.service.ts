import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { LoginDto } from '../models/dtos/login-dto';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

private url = "localhost:8080/auth/";

  constructor(private http: HttpClient) { }

  post(cuerpo:LoginDto):Observable<String> {
    return this.http.post<any>(this.url+"login",cuerpo);
  }
}
