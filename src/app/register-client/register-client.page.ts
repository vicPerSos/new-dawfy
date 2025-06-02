import { Component, OnInit } from '@angular/core';
import { IonicModule, ToastController } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http'; // <-- Agrega esto
import { Router } from '@angular/router';
import { AuthService } from '../service/auth.service';
import { RegisterCliDto } from '../models/dtos/registerCliDto';

@Component({
  selector: 'app-register-client',
  templateUrl: './register-client.page.html',
  standalone: true,
  styleUrls: ['./register-client.page.scss'],
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule // <-- Agrega esto aquí
  ]
})
export class RegisterClientPage implements OnInit {
  registerForm!: FormGroup;
  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private authService: AuthService,
    private toastController: ToastController
  ) { }

  ngOnInit() {
    this.registerForm = this.formBuilder.group({
      Nombre: ['', [Validators.required]],
      Correo: ['', [Validators.required, Validators.email]],
      FechaNacimiento: ['', [Validators.required]],
      Pais: ['', [Validators.required]],
      Foto: ['', [Validators.required]],
      Username: ['', [Validators.required]],
      Password: ['', [Validators.required]],
      ConfirmPassword: ['', [Validators.required]]
    });
  }
  async presentToast(message: string, color: string = 'success') {
    const toast = await this.toastController.create({
      message: message,
      duration: 3000,
      position: 'top',
      color: color
    });
    toast.present();
  }

  onSubmit() {
    if (this.registerForm.valid && this.registerForm.value.Password === this.registerForm.value.ConfirmPassword) {
      console.log('Formulario de register válido:', this.registerForm.value);
      const dto = new RegisterCliDto(
        this.registerForm.value.Nombre,
        this.registerForm.value.Correo,
        this.registerForm.value.FechaNacimiento,
        this.registerForm.value.Pais,
        this.registerForm.value.Foto,
        this.registerForm.value.Username,
        this.registerForm.value.Password
      );
      console.log('DTO creado:', dto);
      this.authService.registerClient(dto).subscribe(
        (response: any) => {
          if (response == "Usuario registrado correctamente") {
            this.presentToast('¡Registro completado con éxito!');
            this.router.navigate(['/welcome']);
          } else {
            this.presentToast('Error en el registro: ' + response, 'danger');
          }
        },
        (error: any) => {
          console.error('Error en registro:', error);
        }
      );
    } else {
      console.log('Formulario de registro inválido');
    }
  }
}
