import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { IonicModule, ModalController } from '@ionic/angular';
import { RegisterArtistDto } from '../models/dtos/registerArtistDto';

@Component({
  selector: 'app-artist-form-modal',
  templateUrl: './artista-form-modal.component.html',
  styleUrls: ['./artista-form-modal.component.scss'],
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule
  ],

})
export class ArtistFormModalComponent {
  @Input() artist!: RegisterArtistDto;
  artistForm!: FormGroup;

  constructor(private modalCtrl: ModalController, private fb: FormBuilder) { }

  ngOnInit() {
    this.artistForm = this.fb.group({
      fechaNacimiento: [this.artist._fechaNacimiento || '', Validators.required],
    username: [this.artist._username || '', Validators.required],
    password: ['', [Validators.required, Validators.minLength(6)]],
    correo: [this.artist._correo || '', [Validators.required, Validators.email]],
    pais: [this.artist._pais || '', Validators.required]
    });
  }

  submit() {
    if (this.artistForm.valid) {
      const artistaCompleto = {
        ...this.artist,
        ...this.artistForm.value,
        roll: this.artist._roll?.includes('ARTISTA') ? this.artist._roll : [...(this.artist._roll || []), 'ARTISTA']
      };
      this.modalCtrl.dismiss(artistaCompleto);
    }
  }

  close() {
    this.modalCtrl.dismiss(null);
  }
}
