import { Component, OnInit } from '@angular/core';
import { UserService } from '../service/user.service';
import { AlbumService } from '../service/album.service';
import { Router } from '@angular/router';

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

  constructor(private userService: UserService, private albumService: AlbumService, private router: Router) { }

  ngOnInit() {
    console.log('Iniciando carga de rol de usuario...');
    this.userService.getUserRole().subscribe({
      next: (role) => {
        console.log('Rol recibido:', role);
        this.userRole = role ? role.toUpperCase() : null; // <-- Normaliza a mayúsculas
        this.loadingRole = false;
        if (this.userRole === 'ARTISTA') {
          console.log('Es artista llamando a cargarMisAlbumes()');
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
    console.log('[cargarMisAlbumes] Se va a pedir los álbumes al servicio...');
    this.albumService.getMisAlbumesFromApi().subscribe({
      next: (albumes) => {
        console.log('[cargarMisAlbumes] Álbumes recibidos:', albumes);
        this.misAlbumes = albumes;
      },
      error: (err) => {
        this.misAlbumes = [];
        console.error('[cargarMisAlbumes] Error obteniendo álbumes del artista:', err);
      }
    });
  }

  anadir() {
    this.router.navigate(['/album-select']);
  }

}