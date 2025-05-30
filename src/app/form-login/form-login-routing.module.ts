import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FormLoginPage } from './form-login.page';

const routes: Routes = [
  {
    path: '',
    component: FormLoginPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FormLoginPageRoutingModule {}
