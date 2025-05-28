import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { BibliotecaPage } from './biblioteca.page';
import { ExploreContainerComponentModule } from '../explore-container/explore-container.module';

import { BibliotecaPageRoutingModule } from './biblioteca-routing.module';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    ExploreContainerComponentModule,
    BibliotecaPageRoutingModule
  ],
  declarations: [BibliotecaPage]
})
export class BibliotecaPageModule {}
