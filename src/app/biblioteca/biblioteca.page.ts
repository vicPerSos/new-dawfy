import { Component } from '@angular/core';
import { UserService } from '../service/user.service';

@Component({
  selector: 'app-tab3',
  templateUrl: 'biblioteca.page.html',
  styleUrls: ['biblioteca.page.scss'],
  standalone: false,
})
export class BibliotecaPage implements OnInit {

  userRole: string | null = null;
  loadingRole = true;

  constructor(private userService: UserService) { }

  ngOnInit() {
    this.userService.getUserRole().subscribe({
      next: (role) => {
        this.userRole = role;
        this.loadingRole = false;
      },
      error: (err) => {
        this.userRole = null;
        this.loadingRole = false;
        console.error('Error obteniendo el rol:', err);
      }
    });
  }
}
