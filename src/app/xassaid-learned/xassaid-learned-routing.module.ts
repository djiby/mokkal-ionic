import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { XassaidLearnedPage } from './xassaid-learned.page';

const routes: Routes = [
  {
    path: '',
    component: XassaidLearnedPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class XassaidLearnedPageRoutingModule {}
