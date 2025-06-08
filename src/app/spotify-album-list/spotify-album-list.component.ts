import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { AlbumService } from '../service/album.service';
import { SpotifyService } from '../service/spoti-album-manager.service';
import { ArtistaService } from '../service/artista.service';

@Component({
  selector: 'app-spotify-album-list',
  templateUrl: './spotify-album-list.component.html',
  styleUrls: ['./spotify-album-list.component.scss'], standalone: true,
  imports: [
    IonicModule,
    CommonModule,
    FormsModule
  ]
})

export class SpotifyAlbumListComponent implements OnInit {
  spotifyAlbums: any[] | null = null;
  albumSeleccionado: any = null;
  cancionesAlbum: any[] = [];
  isLoading: boolean = false; // Nueva variable para el spinner
  colaboradores: string[] = [];


  constructor(
    private spotifyService: SpotifyService,
    private albumService: AlbumService,
    private artistaService: ArtistaService
  ) { }

  ngOnInit() { }

  cargarAlbumsSpotify() {
    this.isLoading = true; // Activar spinner
    console.log('Botón pulsado');

    this.spotifyService.getAlbumsDeSpotify().subscribe({
      next: (albumsResp) => {
        console.log('Respuesta cruda:', albumsResp);
        const albumsArray = albumsResp.albums || [];

        this.spotifyAlbums = albumsArray.map((album: any) => ({
          id: album.id,
          nombre: album.name,
          imagen: album.images?.[0]?.url || 'https://ionicframework.com/docs/img/demos/thumbnail.svg',
          fechaLanzamiento: this.formatearFecha(album.release_date),
          totalCanciones: album.total_tracks || 0,
          tipo: album.album_type || ''
        }));

        console.log('Álbumes mapeados:', this.spotifyAlbums);
      },
      error: (error) => {
        console.error('Error en la petición:', error);
        this.isLoading = false;
      },
      complete: () => {
        this.isLoading = false; // Desactivar spinner al finalizar
      }
    });
  }

  // Nuevo método para manejar errores de imágenes
  handleImageError(event: any) {
    event.target.src = 'https://ionicframework.com/docs/img/demos/thumbnail.svg';
  }

  // Método para formatear fechas
  private formatearFecha(fecha: string): string {
    if (!fecha) return '';
    const [year, month, day] = fecha.split('-');
    return `${day}/${month}/${year}`;
  }


  seleccionarAlbum(album: any) {
    this.isLoading = true;
    // 1. Obtener artista principal por /me
    this.artistaService.getMe().subscribe((user: any) => {
      const artistaId = user.id;
      const artistaNombre = user.display_name;

      // 2. Obtener canciones del álbum
      this.spotifyService.getCancionesDeAlbum(album.id).subscribe((tracksResp: any[]) => {
        // 3. Mapear canciones al modelo que espera el backend
        const canciones = tracksResp.map(track => ({
          nombre: track.name,
          duracion: track.duration_ms,
          numero: track.track_number,
          // ...otros campos que necesites
        }));

        // 4. Mapear el álbum y asignar artista principal
        this.albumSeleccionado = {
          nombre: album.name,
          fechaLanzamiento: album.release_date,
          artista: {
            id: artistaId,
            nombre: artistaNombre
          },
          imagen: album.images?.[0]?.url || 'https://ionicframework.com/docs/img/demos/thumbnail.svg',
          canciones: canciones,
          colaboradores: [] // aquí pon la lista de colaboradores (strings)
        };

        this.isLoading = false;
      });
    });
  }


  guardarAlbumEnBiblioteca() {
    // 1. Obtener el artista principal (de localStorage o de Spotify /me)
    let artistaId = localStorage.getItem('artistaId');
    let artistaNombre = localStorage.getItem('artistaNombre');

    const continuarGuardado = (artistaId: string, artistaNombre: string) => {
      const artistaIdNum = Number(artistaId);

      // 2. Obtener canciones del álbum
      this.spotifyService.getCancionesDeAlbum(this.albumSeleccionado.id).subscribe((tracksResp: any[]) => {
        const canciones = tracksResp.map(track => ({
          nombre: track.name,
          duracion: track.duration_ms,
          numero: track.track_number,
          // Otros campos si necesitas
        }));

        // 3. Mapea el álbum al formato que espera tu backend
        const albumBody = {
          nombre: this.albumSeleccionado.nombre,
          fechaLanzamiento: (this.albumSeleccionado.fechaLanzamiento || '').substring(0, 10),
          artista: artistaIdNum, // <-- SOLO el id, no el objeto
          imagen: this.albumSeleccionado.imagen,
          canciones: canciones,
          colaboradores: this.colaboradores || []
        };

        // 4. Enviar al backend
        this.albumService.postAlbum(albumBody).subscribe(() => {
          this.albumSeleccionado = null;
          this.cancionesAlbum = [];
          alert('Álbum guardado en tu biblioteca');
        }, err => {
          alert('Error al guardar el álbum: ' + (err.error?.message || ''));
        });
      });
    };

    if (!artistaId) {
      // Si no hay artista, pide a /me
      this.artistaService.getMe().subscribe((user: any) => {
        if (user && user.id) {
          artistaId = user.id;
          artistaNombre = user.display_name;
          localStorage.setItem('artistaId', user.id);
          localStorage.setItem('artistaNombre', user.display_name);
          continuarGuardado(artistaId!, artistaNombre!);
        } else {
          alert('No se pudo obtener tu cuenta de Spotify. Intenta iniciar sesión de nuevo.');
        }
      }, error => {
        alert('Error al obtener datos de Spotify.');
      });
      return;
    }

    // Si ya tienes el artista, continúa normalmente
    continuarGuardado(artistaId, artistaNombre!);
  }

}
