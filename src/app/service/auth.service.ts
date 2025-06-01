import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { LoginDto } from '../models/dtos/login-dto';
import { RegisterCliDto } from '../models/dtos/registerCliDto';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

private url = "http://localhost:8080/auth/";

  constructor(private http: HttpClient) { }

  logIn(cuerpo:LoginDto):Observable<String> {
    return this.http.post(this.url + "login", cuerpo, { responseType: 'text' });
  }
  registerClient(cuerpo:RegisterCliDto):Observable<String> {
    return this.http.post(this.url + "register", cuerpo, { responseType: 'text' });
  }
}
