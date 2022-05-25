import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { XassaidToLearnPage } from './xassaid-to-learn.page';

const routes: Routes = [
  {
    path: '',
    component: XassaidToLearnPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class XassaidToLearnPageRoutingModule {}
