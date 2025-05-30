import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FormLoginPageRoutingModule } from './form-login-routing.module';

import { FormLoginPage } from './form-login.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FormLoginPageRoutingModule,
    FormLoginPage
  ]
})
export class FormLoginPageModule {}
