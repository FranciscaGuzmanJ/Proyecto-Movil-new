import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

import { AuthGuard } from './guards/auth.guard'; // Importa el guard


const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./pages/home/home.module').then( m => m.HomePageModule)
  },
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'login',
    loadChildren: () => import('./pages/login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'error',
    loadChildren: () => import('./pages/error/error.module').then( m => m.ErrorPageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'rcontra',
    loadChildren: () => import('./pages/rcontra/rcontra.module').then( m => m.RcontraPageModule)
  },
  {
    path: 'registro',
    loadChildren: () => import('./pages/registro/registro.module').then( m => m.RegistroPageModule)
  },
  {
    path: 'tab',
    loadChildren: () => import('./pages/tab/tab.module').then( m => m.TabPageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'albunes',
    loadChildren: () => import('./pages/albunes/albunes.module').then( m => m.AlbunesPageModule),
    canActivate: [AuthGuard]
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
