import { Component, OnInit } from '@angular/core';
import { CategoriaService } from 'src/app/service/categoria.service';
import { ArtistaService } from 'src/app/service/artista.service';
import { Artista } from '../models/artista/artista';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: false,
})
export class HomePage implements OnInit {
  categorias: string[] = [];
  artistas: Artista[] = [];

  constructor(
    private categoriaService: CategoriaService,
    private artistaService: ArtistaService
  ) { }

  ngOnInit() {
    this.cargarCategorias();
    this.cargaArtistasIniciales(); // Nueva función
  }

  private cargaArtistasIniciales() {
    this.artistaService.get().subscribe({
      next: (artistas) => this.artistas = artistas,
      error: (err) => console.error('Error cargando todos los artistas', err)
    });
  }

  // Modifica el método onCategoriaClick
  onCategoriaClick(categoria: string) {
    if (categoria === 'Todos') {
      this.cargaArtistasIniciales();
    } else {
      this.artistaService.getArtistasByCategoria(categoria).subscribe({
        next: (artistas) => this.artistas = artistas,
        error: (err) => console.error('Error cargando artistas', err)
      });
    }
  }

  private cargarCategorias() {
    this.categoriaService.getCategorias().subscribe({
      next: (data) => {
        // Agregar "Todos" como primera categoría
        this.categorias = ['Todos', ...data];
      },
      error: (err) => console.error('Error cargando categorías', err)
    });
  }
}