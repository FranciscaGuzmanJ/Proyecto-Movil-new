import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SubirContenidoPageRoutingModule } from './subir-contenido-routing.module';

import { SubirContenidoPage } from './subir-contenido.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SubirContenidoPageRoutingModule
  ],
  declarations: [SubirContenidoPage]
})
export class SubirContenidoPageModule {}
