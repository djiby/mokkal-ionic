import { Injectable } from '@angular/core';
import { LoadingController, Platform } from '@ionic/angular';
import { Storage } from '@ionic/storage-angular';
import { initializeApp } from 'firebase/app';
import { getStorage, ref, getDownloadURL } from "firebase/storage";
import { environment } from 'src/environments/environment';
import { File } from '@ionic-native/file/ngx';
import { HTTP } from '@ionic-native/http/ngx';
import { Xassaid } from './model/xassaid.model';
import { Beuyit } from './model/beuyit.model';


@Injectable({
  providedIn: 'root'
})
export class StorageService {

  private _storage: Storage | null = null;
  storageDirectory: string = '';

  constructor(private storage: Storage, public platform: Platform,
     private file: File, private http: HTTP,
     public loadingController: LoadingController) {
      this.init();
  }

   async init() {
    const storage = await this.storage.create();
    this._storage = storage;
    this.platform.ready().then(() => {
      if (this.platform.is('ios')) {
        this.storageDirectory = this.file.documentsDirectory;
      } else if (this.platform.is('android')) {
        this.storageDirectory = this.file.dataDirectory;
      } else {
        this.storageDirectory = this.file.cacheDirectory;
      }
    });
  }

  public set(key: string, value: any) {
    this._storage?.set(key, value);
  }

  public async get(key: string){
    return this._storage.get(key).then(res => {
      return res;
    });
  }

  public setXassaid(xassaid: Xassaid){
    this.get('xassaid').then(xassaids=>{
      const i = xassaids.findIndex(x=> x.name == xassaid.name);
      xassaids[i] = xassaid;
      this.set('xassaid', xassaids);
    })
    
  }

  async downloadPicture(xassaid: Xassaid, beuyit: Beuyit){
    const loading = await this.loadingController.create({
      message: 'Téléchargement...'
    });
    await loading.present();

    const picture = xassaid.name.toLowerCase() + '/image/0' + beuyit.num + ' ' + xassaid.name.toLowerCase() + '.png';
    const app = initializeApp(environment.firebase);
    const stor = getStorage(app);
    const re = ref(stor, picture);

    getDownloadURL(re).then(picture =>{
      const path = this.storageDirectory + 'image' + xassaid.name + beuyit.num  + '.png';

      this.http.downloadFile(picture, {}, {}, path).then(res =>{
        
        this.file.readAsDataURL(this.storageDirectory, 'image' + xassaid.name + beuyit.num  + '.png').then(result => {
          this.downloadAudio(xassaid, beuyit, result);
        });
        
      }).catch(err =>{
        this.loadingController.dismiss();
        alert('err downloadPicture ' +JSON.stringify(err));
      });

    }).catch(err =>{
      this.loadingController.dismiss();
      alert('err getDownloadURLPicture ' +JSON.stringify(err));
    });
  }

  downloadAudio(xassaid: Xassaid, beuyit: Beuyit, picture: any){
    const audio = xassaid.name.toLowerCase() + '/audio/0' + beuyit.num + ' ' + xassaid.name.toLowerCase() + '.mp3';
    const app = initializeApp(environment.firebase);
    const stor = getStorage(app);
    const re = ref(stor, audio);

    getDownloadURL(re).then(audio =>{
      const path = this.storageDirectory + 'audio' + xassaid.name + beuyit.num  + '.mp3';

      this.http.downloadFile(audio, {}, {}, path).then(res =>{

        this.file.removeFile(this.storageDirectory, 'image' + xassaid.name + beuyit.num  + '.png');
        xassaid.beuyits[beuyit.num-1].audio = 'audio' + xassaid.name + beuyit.num  + '.mp3';
        xassaid.beuyits[beuyit.num-1].picture = picture;
        xassaid.beuyits[beuyit.num-1].isDownload = true;
        this.setXassaid(xassaid);
        this.loadingController.dismiss();
        
      }).catch(err =>{
        this.loadingController.dismiss();
        alert('err downloadAudio ' +JSON.stringify(err));
      });

    }).catch(err =>{
      this.loadingController.dismiss();
      alert('err getDownloadURLAudio ' +JSON.stringify(err));
    });
  }
}
