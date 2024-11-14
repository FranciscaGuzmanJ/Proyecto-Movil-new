import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AlbunesPageRoutingModule } from './albunes-routing.module';

import { AlbunesPage } from './albunes.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AlbunesPageRoutingModule
  ],
  declarations: [AlbunesPage]
})
export class AlbunesPageModule {}
