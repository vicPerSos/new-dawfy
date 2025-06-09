import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { AlbumService } from '../service/album.service';
import { SpotifyService } from '../service/spotify.service';
import { ArtistaService } from '../service/artista.service';
import { ToastController } from '@ionic/angular';
import { Router } from '@angular/router';

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
    private artistaService: ArtistaService,
    private toastController: ToastController,
    private router: Router
  ) { }

  ngOnInit() { }
  async presentToast(message: string, color: 'success' | 'danger') {
    const toast = await this.toastController.create({
      message,
      duration: 2000,
      color,
      position: 'top'
    });
    await toast.present();
  }


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
  // Si album.fechaLanzamiento ya viene como '25/04/2024'
  private formatearFecha(fecha: string): string {
    // Si ya es yyyy-MM-dd, la devolvemos tal cual
    if (/^\d{4}-\d{2}-\d{2}$/.test(fecha)) return fecha;
    // Si es dd/MM/yyyy, la convertimos
    const [day, month, year] = fecha.split('/');
    return `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`;
  }



  seleccionarAlbum(album: any) {
    console.log('[seleccionarAlbum] Álbum seleccionado:', album);
    this.isLoading = true;

    this.artistaService.getMe().subscribe({
      next: (user: any) => {
        console.log('[seleccionarAlbum] Artista obtenido:', user);
        const artistaId = user.id;
        const artistaNombre = user.display_name;

        // Usamos la imagen real del álbum
        const albumImagen = album.imagen || album.images?.[0]?.url || 'https://ionicframework.com/docs/img/demos/thumbnail.svg';

        // Obtener canciones del álbum desde tu backend
        this.spotifyService.getCancionesDeAlbum(album.id).subscribe({
          next: (tracksResp: any[]) => {
            console.log('[seleccionarAlbum] Canciones obtenidas:', tracksResp);

            // Mapear canciones, añadiendo el campo imagen
            const canciones = (tracksResp || []).map(track => ({
              nombre: track.name,
              duracion: track.duration_ms,
              numero: track.track_number,
              imagen: albumImagen // Imagen del álbum para cada canción
              // Puedes añadir más campos si tu backend los necesita
            }));

            // Mapear el álbum con todos los campos correctos
            this.albumSeleccionado = {
              id: album.id,
              nombre: album.nombre, // Usar el campo correcto
              fechaLanzamiento: album.fechaLanzamiento, // Si ya está formateada
              artista: artistaId, // O { id: artistaId, nombre: artistaNombre } si tu backend lo requiere
              imagen: albumImagen,
              canciones: canciones,
              colaboradores: [] // Llena esto si tienes colaboradores
            };

            this.cancionesAlbum = canciones;
            this.isLoading = false;
            console.log('[seleccionarAlbum] albumSeleccionado preparado:', this.albumSeleccionado);
          },
          error: (error) => {
            this.isLoading = false;
            console.error('[seleccionarAlbum] Error al obtener las canciones del álbum:', error);
            alert('Error al obtener las canciones del álbum.');
          }
        });
      },
      error: (error) => {
        this.isLoading = false;
        console.error('[seleccionarAlbum] Error al obtener el artista principal:', error);
        alert('Error al obtener el artista principal.');
      }
    });
  }

  guardarAlbumEnBiblioteca() {
    let artistaId = localStorage.getItem('artistaId');
    let artistaNombre = localStorage.getItem('artistaNombre');

    const continuarGuardado = (artistaId: string, artistaNombre: string) => {
      const artistaIdNum = Number(artistaId);

      const albumBody = {
        nombre: this.albumSeleccionado.nombre,
        fechaLanzamiento: this.albumSeleccionado.fechaLanzamiento,
        artista: artistaIdNum,
        imagen: this.albumSeleccionado.imagen
      };

      this.albumService.postAlbum(albumBody).subscribe({
        next: (albumResponse: any) => {
          const albumId = albumResponse.id;

          if (!albumId || albumId === 0) {
            this.presentToast('Error: El álbum no se ha guardado correctamente. ID recibido: ' + albumId, 'danger');
            this.router.navigate(['/tabs/biblioteca']);
            return;
          }

          const canciones = this.albumSeleccionado.canciones || [];
          let cancionesGuardadas = 0;
          let erroresCanciones = 0;

          if (canciones.length === 0) {
            this.presentToast('Álbum guardado en tu biblioteca (sin canciones)', 'success');
            this.albumSeleccionado = null;
            this.cancionesAlbum = [];
            this.router.navigate(['/tabs/biblioteca']);
            return;
          }

          canciones.forEach((cancion: any, idx: number) => {
            console.log(`[guardarAlbumEnBiblioteca] Canción #${idx + 1} preview_url:`, cancion.url);
            const cancionBody = {
              nombre: cancion.nombre,
              duracion: cancion.duracion,
              album: albumId,
              imagen: cancion.imagen,
              url: cancion.preview_url || ''  // Esto ya es el preview_url o ''
            };
            console.log('tracksResp:', canciones);

            this.albumService.postCancion(cancionBody).subscribe({
              next: () => {
                cancionesGuardadas++;
                if (cancionesGuardadas + erroresCanciones === canciones.length) {
                  this.presentToast(`Álbum y ${cancionesGuardadas} canciones guardadas correctamente`, 'success');
                  this.albumSeleccionado = null;
                  this.cancionesAlbum = [];
                  this.router.navigate(['/tabs/biblioteca']);
                }
              },
              error: (err) => {
                erroresCanciones++;
                if (cancionesGuardadas + erroresCanciones === canciones.length) {
                  this.presentToast(`Álbum guardado, pero ${erroresCanciones} canciones no se pudieron guardar`, 'danger');
                  this.albumSeleccionado = null;
                  this.cancionesAlbum = [];
                  this.router.navigate(['/tabs/biblioteca']);
                }
              }
            });
          });
        },
        error: (err) => {
          this.presentToast('Error al guardar el álbum: ' + (err.error?.message || ''), 'danger');
          this.router.navigate(['/tabs/biblioteca']);
        }
      });
    };

    if (!artistaId) {
      this.artistaService.getMe().subscribe((user: any) => {
        if (user && user.id) {
          artistaId = user.id;
          artistaNombre = user.display_name;
          localStorage.setItem('artistaId', user.id);
          localStorage.setItem('artistaNombre', user.display_name);
          continuarGuardado(artistaId!, artistaNombre!);
        } else {
          this.presentToast('No se pudo obtener tu cuenta de Spotify. Intenta iniciar sesión de nuevo.', 'danger');
          this.router.navigate(['/tabs/biblioteca']);
        }
      }, error => {
        this.presentToast('Error al obtener datos de Spotify.', 'danger');
        this.router.navigate(['/tabs/biblioteca']);
      });
      return;
    }
    continuarGuardado(artistaId, artistaNombre!);
  }







}
