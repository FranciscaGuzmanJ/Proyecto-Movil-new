import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TabPage } from './tab.page';

const routes: Routes = [
  {
    path: '',
    component: TabPage,
    children: [
  {
    path: 'subir-contenido',
    loadChildren: () => import('./../../pages/subir-contenido/subir-contenido.module').then( m => m.SubirContenidoPageModule)
  },
  {
    path: 'menu',
    loadChildren: () => import('./../../pages/menu/menu.module').then( m => m.MenuPageModule)
  },
  {
    path: 'albumes',
    loadChildren: () => import('./../../pages/albunes/albunes.module').then( m => m.AlbunesPageModule)
  },
  {
    path: 'home',
    loadChildren: () => import('./../../pages/home/home.module').then( m => m.HomePageModule)
  }
]
}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TabPageRoutingModule {}
