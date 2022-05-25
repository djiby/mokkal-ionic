import { Component, OnInit } from '@angular/core';
import { StorageService } from '../storage.service';

@Component({
  selector: 'app-profil-created',
  templateUrl: './profil-created.page.html',
  styleUrls: ['./profil-created.page.scss'],
})
export class ProfilCreatedPage implements OnInit {

  name: string;
  picture: string;

  constructor(private storage: StorageService) { }

  ngOnInit() {
    this.storage.get('profil').then(res=>{
      this.name = res.name;
      this.picture = res.picture;
      this.storage.set('profil', {name: this.name, picture: this.picture, created: true});

    });
  }

}
