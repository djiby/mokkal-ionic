import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { XassaidPage } from './xassaid.page';

const routes: Routes = [
  {
    path: '',
    component: XassaidPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class XassaidPageRoutingModule {}
