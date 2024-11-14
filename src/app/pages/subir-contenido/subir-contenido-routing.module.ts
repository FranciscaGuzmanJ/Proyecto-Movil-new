import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SubirContenidoPage } from './subir-contenido.page';

const routes: Routes = [
  {
    path: '',
    component: SubirContenidoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SubirContenidoPageRoutingModule {}
