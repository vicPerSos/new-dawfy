import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IonicModule } from '@ionic/angular';
@Component({
  selector: 'app-register-type',
  templateUrl: './register-type.page.html',
  standalone: true,
  imports: [IonicModule],
  styleUrls: ['./register-type.page.scss'],
})
export class RegisterTypePage implements OnInit {
  constructor(private router: Router) { }
  ngOnInit() { }
  registerClient() {
    this.router.navigate(['/register/client']);
  }
  regiterArtist() {
    this.router.navigate(['/login/artist']);
  }
}