import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ProfilCreationPageRoutingModule } from './profil-creation-routing.module';

import { ProfilCreationPage } from './profil-creation.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ProfilCreationPageRoutingModule
  ],
  declarations: [ProfilCreationPage]
})
export class ProfilCreationPageModule {}
