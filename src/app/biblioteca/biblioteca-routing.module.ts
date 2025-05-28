import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BibliotecaPage } from './biblioteca.page';

const routes: Routes = [
  {
    path: '',
    component: BibliotecaPage,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BibliotecaPageRoutingModule {}
