import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common'; // Importa CommonModule
import { FormsModule } from '@angular/forms';   // Importa FormsModule
import { IonicModule } from '@ionic/angular';   // Importa IonicModule
import { Router } from '@angular/router';       // Importa Router

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.page.html',
  styleUrls: ['./welcome.page.scss'],
  standalone: true, // Asegúrate de que sea standalone
  imports: [
    IonicModule,    // Añade IonicModule a los imports del componente
    CommonModule,   // Añade CommonModule para directivas como *ngIf, *ngFor
    FormsModule     // Añade FormsModule si usas ngModel
    // Si WelcomePageRoutingModule es necesario y es standalone, también se importaría aquí.
  ]
})
export class WelcomePage implements OnInit {

  constructor(private router: Router) {}

  ngOnInit() {
  }

  navigateToHome() {
    this.router.navigate(['/tabs/home']);
  }
  navigateToLogin() {
    this.router.navigate(['/login']);
  }

}
