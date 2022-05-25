import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { StorageService } from '../storage.service';

@Component({
  selector: 'app-profil-creation',
  templateUrl: './profil-creation.page.html',
  styleUrls: ['./profil-creation.page.scss'],
})
export class ProfilCreationPage implements OnInit {

  name: string;
  picture = '../../assets/user-line.svg';

  constructor(private router: Router, private storage: StorageService, private camera: Camera) { }

  ngOnInit() {
  }

  next(){
    this.storage.set('profil', {name: this.name, picture: this.picture, created: false});
    this.router.navigate(['/xassaid-learned']);
  }

  async takePicture(){
    const options: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      sourceType: this.camera.PictureSourceType.PHOTOLIBRARY
    }

    this.camera.getPicture(options).then((imageData) => {
      // imageData is either a base64 encoded string or a file URI
      // If it's base64 (DATA_URL):
      this.picture = 'data:image/jpeg;base64,' + imageData;
     }, (err) => {
      // Handle error
     });
  }

}
