import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ProfilCreatedPage } from './profil-created.page';

const routes: Routes = [
  {
    path: '',
    component: ProfilCreatedPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProfilCreatedPageRoutingModule {}
