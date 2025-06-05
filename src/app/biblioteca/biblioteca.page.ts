import { Component, OnInit } from '@angular/core';
import { UserService } from '../service/user.service';
import { AlbumService } from '../service/album.service';

@Component({
  selector: 'app-tab3',
  templateUrl: 'biblioteca.page.html',
  styleUrls: ['biblioteca.page.scss'],
  standalone: false,
})
export class BibliotecaPage implements OnInit {

  userRole: string | null = null;
  loadingRole = true;
  misAlbumes: any[] = []; // <-- ¡Aquí declaras la variable!

  constructor(private userService: UserService, private albumService: AlbumService) { }

  ngOnInit() {
      console.log('Iniciando carga de rol de usuario...');
    this.userService.getUserRole().subscribe({
      next: (role) => {console.log('Rol recibido:', role);
        this.userRole = role;
        this.loadingRole = false;
        if (role === 'ARTISTA') {
          this.cargarMisAlbumes();
        }
      },
      error: (err) => {
        this.userRole = null;
        this.loadingRole = false;
        console.error('Error obteniendo el rol:', err);
      }
    });
  }

  cargarMisAlbumes() {
    this.albumService.getMisAlbumes().subscribe({ // <-- ¡Corrige el nombre!
      next: (albumes) => {
        this.misAlbumes = albumes;
      },
      error: (err) => {
        this.misAlbumes = [];
        console.error('Error obteniendo álbumes del artista:', err);
      }
    });
  }

}