import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { XassaidPageRoutingModule } from './xassaid-routing.module';

import { XassaidPage } from './xassaid.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    XassaidPageRoutingModule
  ],
  declarations: [XassaidPage]
})
export class XassaidPageModule {}
