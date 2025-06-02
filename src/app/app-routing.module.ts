import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'welcome',
    pathMatch: 'full'
  },
  {
    path: 'welcome',
    loadChildren: () => import('./welcome/welcome.module').then(m => m.WelcomePageModule)
  },
  {
    path: 'login',
    loadChildren: () => import('./form-login/form-login.module').then(m => m.FormLoginPageModule)
  },
  {
    path: 'tabs',
    loadChildren: () => import('./tabs/tabs.module').then(m => m.TabsPageModule)
  },
  {
    path: 'register',
    loadComponent: () => import('./register-type/register-type.page').then(m => m.RegisterTypePage)
  },
  {
    path: 'register/client',
    loadComponent: () => import('./register-client/register-client.page').then(m => m.RegisterClientPage)
  },
  {
    path: 'register/artist',
    loadComponent: () => import('./register-artist/register-artist.page').then(m => m.RegisterArtistPage)
  }






];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
