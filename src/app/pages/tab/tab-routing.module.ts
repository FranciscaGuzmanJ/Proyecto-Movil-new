import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TabPage } from './tab.page';
import { AuthGuard } from 'src/app/guards/auth.guard';

const routes: Routes = [
  {
    path: '',
    component: TabPage,
    children: [
  {
    path: 'subir-contenido',
    loadChildren: () => import('./../../pages/subir-contenido/subir-contenido.module').then( m => m.SubirContenidoPageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'menu',
    loadChildren: () => import('./../../pages/menu/menu.module').then( m => m.MenuPageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'albumes',
    loadChildren: () => import('./../../pages/albunes/albunes.module').then( m => m.AlbunesPageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'home',
    loadChildren: () => import('./../../pages/home/home.module').then( m => m.HomePageModule),
    canActivate: [AuthGuard]
  }
]
}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TabPageRoutingModule {}
