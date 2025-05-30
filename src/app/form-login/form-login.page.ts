import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormGroup, FormBuilder, Validators } from '@angular/forms'; // <-- Importa ReactiveFormsModule, FormGroup, FormBuilder y Validators
import { IonicModule } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-form-login',
  templateUrl: './form-login.page.html',
  styleUrls: ['./form-login.page.scss'],
  standalone: true,
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule // <-- ¡Asegúrate de importar ReactiveFormsModule aquí!
  ]
})
export class FormLoginPage implements OnInit {

  // 1. Declara la propiedad loginForm de tipo FormGroup
  loginForm!: FormGroup; // '!' le dice a TypeScript que será inicializado

  constructor(
    private formBuilder: FormBuilder, // <-- Inyecta FormBuilder
    private router: Router
  ) { }

  ngOnInit() {
    // 2. Inicializa loginForm en ngOnInit
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required], // Campo 'username' con validación de requerido
      password: ['', Validators.required]  // Campo 'password' con validación de requerido
    });
  }

  // 3. Define la función onSubmit
  onSubmit() {
    if (this.loginForm.valid) {
      console.log('Formulario de login válido:', this.loginForm.value);
      // Aquí iría tu lógica para enviar los datos de login a un servicio, etc.
      // Por ejemplo, navegar a otra página:
      // this.router.navigate(['/home']);
    } else {
      console.log('Formulario de login inválido');
      // Puedes añadir lógica para mostrar mensajes de error al usuario
    }
  }

}
