import { Component, OnInit } from '@angular/core';
import { IonicModule, ToastController } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http'; // <-- Agrega esto
import { Router } from '@angular/router';
import { AuthService } from '../service/auth.service';
import { RegisterArtistDto } from '../models/dtos/registerArtistDto';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { ModalController } from '@ionic/angular';
import { ArtistFormModalComponent } from '../artista-form-modal/artista-form-modal.component';

@Component({
  selector: 'app-register-artist',
  templateUrl: './register-artist.page.html',
  styleUrls: ['./register-artist.page.scss'],
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ]
})
export class RegisterArtistPage implements OnInit {
  searchTerm: string = '';
  results: any[] = [];
  loading: boolean = false;
  private searchSubject = new Subject<string>();
  constructor(private authService: AuthService,
    private modalCtrl: ModalController,
    private toastController: ToastController,
    private router: Router,
  ) { }



  ngOnInit() {
    this.searchSubject.pipe(
      debounceTime(300), // Espera 300ms después de que el usuario deje de escribir
      distinctUntilChanged(),
      switchMap(term => {
        if (this.searchTerm.trim() === '') {
          this.results = [];
          this.loading = false;
          return [];
        }
        this.loading = true;
        return this.authService.infoArtist(term);
      })
    ).subscribe((res: any) => {
      this.results = res || [];
      this.loading = false;
    });
  }
  mapSpotifyResponseToArtistDto(response: any, fecha: Date, usernameForm: string, passwordForm: string): RegisterArtistDto[] {
    const artistas = response.artists.items;

    return artistas.map((item: any) => {
      const nombre = item.name;
      const correo = `${item.id}@spotify.mock`; // correo simulado
      const fechaNacimiento = fecha; // fecha por defecto (ya que Spotify no lo da)
      const pais = 'Desconocido'; // o podrías inferirlo si tienes datos de mercado
      const foto = item.images?.[0]?.url || '';
      const username = usernameForm; // usa el id como username
      const password = passwordForm; // por defecto, puedes pedir que lo edite luego
      const spotifyId = item.id; // id de Spotify

      return new RegisterArtistDto(
        nombre,
        correo,
        fechaNacimiento,
        pais,
        foto,
        username,
        password,
        spotifyId
      );
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
  onSearchChange() {
    if (this.searchTerm.trim() === '') {
      this.results = [];
      return;
    }
    this.authService.infoArtist(this.searchTerm).subscribe(res => {
      // Aquí haces el mapeo
      const artistasMapeados = this.mapSpotifyResponseToArtistDto(
        res,
        new Date(),        // Fecha actual o la que quieras
        'usuarioMock',     // Username preventivo
        'passwordMock'     // Password preventivo
      );
      // Pintar por consola
      console.log(artistasMapeados);

      // Si quieres mostrar los artistas mapeados en la vista:
      this.results = artistasMapeados;
    });
  }

  async openArtistForm(artist: RegisterArtistDto) {
    const modal = await this.modalCtrl.create({
      component: ArtistFormModalComponent,
      componentProps: { artist }
    });
    await modal.present();

    const { data } = await modal.onWillDismiss();
    if (data) {
      this.authService.registerArtist(data).subscribe(
        res => {
          this.presentToast('¡Registro completado con éxito!');
          this.router.navigate(['/welcome']);
        },
        err => {
          this.presentToast('Error en el registro: ', 'danger');

        }
      );
    }
  }
}


