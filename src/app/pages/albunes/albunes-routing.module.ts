import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AlbunesPage } from './albunes.page';

const routes: Routes = [
  {
    path: '',
    component: AlbunesPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AlbunesPageRoutingModule {}
