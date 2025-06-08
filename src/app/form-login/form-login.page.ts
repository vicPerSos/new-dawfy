import { Component, OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http'; // <-- Agrega esto
import { Router } from '@angular/router';
import { AuthService } from '../service/auth.service';
import { ArtistaService } from '../service/artista.service';

@Component({
  selector: 'app-form-login',
  templateUrl: './form-login.page.html',
  styleUrls: ['./form-login.page.scss'],
  standalone: true,
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule // <-- Agrega esto aquí
  ]
})
export class FormLoginPage implements OnInit {
  loginForm!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private authService: AuthService,
    private artistaService: ArtistaService
  ) { }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      username: ['', [Validators.required]], // Usar array para validadores
      password: ['', [Validators.required]]
    });
  }

  onSubmit() {
    if (this.loginForm.valid) {
      console.log('Formulario de login válido:', this.loginForm.value);
      this.authService.logIn(this.loginForm.value).subscribe(
        (token: String) => {
          if (token) {
            document.cookie = `authorization=${token}; path=/;`;
            console.log('Token guardado en cookie authorization ' + token);
            this.artistaService.getMe().subscribe(
              (artista) => {
                if (artista && artista.id !== undefined && artista.id !== null) {
                  localStorage.setItem('artistaId', artista.id.toString());
                  console.log('Id de artista guardado:', artista.id);
                  this.router.navigate(['/tabs/home']);
                } else {
                  // Maneja el error: id no recibido
                  console.error('El artista no tiene id');
                  // Muestra un mensaje al usuario si es necesario
                }
              },
              (error) => {
                console.error('No se pudo obtener el artista:', error);
                // Opcional: manejar error, mostrar mensaje, etc.
              });
            this.router.navigate(['/tabs/home']);
          } else {
            console.error('Token no recibido en la respuesta');
          }
        },
        (error: any) => {
          console.error('Error en login:', error);
        }
      );
    } else {
      console.log('Formulario de login inválido');
    }
  }
}