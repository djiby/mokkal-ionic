import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ProfilCreationPage } from './profil-creation.page';

const routes: Routes = [
  {
    path: '',
    component: ProfilCreationPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProfilCreationPageRoutingModule {}
