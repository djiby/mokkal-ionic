import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ProfilCreatedPageRoutingModule } from './profil-created-routing.module';

import { ProfilCreatedPage } from './profil-created.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ProfilCreatedPageRoutingModule
  ],
  declarations: [ProfilCreatedPage]
})
export class ProfilCreatedPageModule {}
