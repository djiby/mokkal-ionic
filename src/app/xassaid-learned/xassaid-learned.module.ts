import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { XassaidLearnedPageRoutingModule } from './xassaid-learned-routing.module';

import { XassaidLearnedPage } from './xassaid-learned.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    XassaidLearnedPageRoutingModule
  ],
  declarations: [XassaidLearnedPage]
})
export class XassaidLearnedPageModule {}
