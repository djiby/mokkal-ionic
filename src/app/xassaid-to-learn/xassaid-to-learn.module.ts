import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { XassaidToLearnPageRoutingModule } from './xassaid-to-learn-routing.module';

import { XassaidToLearnPage } from './xassaid-to-learn.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    XassaidToLearnPageRoutingModule
  ],
  declarations: [XassaidToLearnPage]
})
export class XassaidToLearnPageModule {}
