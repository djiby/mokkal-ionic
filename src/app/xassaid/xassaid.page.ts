import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Xassaid } from '../model/xassaid.model';
import { StorageService } from '../storage.service';
import { DatePipe } from '@angular/common';
import { Platform } from '@ionic/angular';
import { File } from '@ionic-native/file/ngx';
import { Media, MediaObject } from '@ionic-native/media/ngx';

@Component({
  selector: 'app-xassaid',
  templateUrl: './xassaid.page.html',
  styleUrls: ['./xassaid.page.scss'],
})
export class XassaidPage implements OnInit {

  pictureBeuyite: any;
  picture: string;
  xassaid: Xassaid;
  beuyits: any;
  xassaids: Array<Xassaid>;

  storageDirectory: string = '';
  curr_playing_file: MediaObject;
  is_playing: boolean = false;
  is_in_play: boolean = false;
  is_ready: boolean = false;
  duration: any = -1;
  position: any = 0;
  get_duration_interval: any;
  get_position_interval: any;
  filename: string;
  activeTrack: any;
  val: boolean;

  constructor(private storage: StorageService,
     private route: ActivatedRoute,
     private media: Media,
     private datePipe: DatePipe,
     private platform: Platform,
     private file: File
     ) { 
    this.route.queryParams.subscribe(params => {
      if (params && params.data) {
       this.xassaid = JSON.parse(params.data);
       this.xassaid.beuyits = this.xassaid.beuyits.filter(b => b != null);
      }
    });

    this.init();
  }

  ngOnInit() {
    this.storage.get('profil').then(res=>{
      this.picture = res.picture;
    });
  }

  init(){
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

  ionViewWillEnter(){
    this.storage.get('xassaid').then(res=>{
      this.xassaids = res;
    });
  }

  ionViewDidLeave(){
    this.stop();
  }

  download(beuyit){
    this.storage.downloadPicture(this.xassaid, beuyit);
  }

  background(beuyit){
    return beuyit.isLearned ? 'background: #92E49D;' : 'background: none;';
  }

  isLearned(event, beuyit){
    this.xassaid.beuyits[beuyit.num-1].isLearned = event.detail.checked;
    this.xassaid.countLearned = event.detail.checked == true ? this.xassaid.countLearned + 1 : this.xassaid.countLearned - 1;
    if(this.xassaid.countLearned == this.xassaid.countBeuyite){
      this.xassaid.isLearned = true;
    }
    const i = this.xassaids.findIndex(x=> x.name == this.xassaid.name);
    this.xassaids[i] = this.xassaid;
    this.storage.set('xassaid', this.xassaids)
  }

  start(beuyit){
    this.pictureBeuyite = beuyit.picture;
    if(this.activeTrack){
      this.stop();
    }
    this.filename = beuyit.audio;
    this.activeTrack = beuyit;
    this.is_playing = false;
    this.getDurationAndSetToPlay();
  }

  stop(){
    this.curr_playing_file.stop();
    this.curr_playing_file.release();
    clearInterval(this.get_position_interval);
    clearInterval(this.get_duration_interval);
    this.duration = -1;
    this.position = 0;
  }

  getDurationAndSetToPlay() {
    this.curr_playing_file = this.createAudioFile(
      this.storageDirectory,
      this.filename
    );
    this.curr_playing_file.play();

    let self = this;
    this.get_duration_interval = setInterval(function() {
      if (self.duration == -1) {
        self.duration = ~~self.curr_playing_file.getDuration();
      }
      else {
        self.curr_playing_file.stop();
        self.curr_playing_file.release(); 
        self.setRecordingToPlay();    
        clearInterval(self.get_duration_interval);
      }
    }, 100);
  }

  createAudioFile(pathToDirectory, filename): MediaObject {
    if (this.platform.is('ios')) {
      //ios
      return this.media.create(pathToDirectory.replace(/^file:\/\//, '') + '/' + filename);
    } else {
      // android
      return this.media.create(pathToDirectory + filename);
    }
  }

  setRecordingToPlay() {
    this.curr_playing_file = this.createAudioFile(
      this.storageDirectory,
      this.filename
    );
    this.curr_playing_file.onStatusUpdate.subscribe(status => {
      switch (status) {
        case 1:
          this.is_in_play = false;
          break;
        case 2: // 2: playing
          this.is_in_play = true;
          this.is_playing = true;
          break;
        case 3: // 3: pause
          this.is_in_play = true;
          this.is_playing = false;
          break;
        case 4: // 4: stop
        default:
          this.is_in_play = false;
          this.is_playing = false;
          break;
      }
    });
    this.is_ready = true;
    this.getAndSetCurrentAudioPosition();
  }

  getAndSetCurrentAudioPosition() {
    let diff = 1;
    let self = this;
    this.get_position_interval = setInterval(function() {
      let last_position = self.position;
      self.curr_playing_file.getCurrentPosition().then(position => {
        if (position >= 0 && position < self.duration) {
          
          if (Math.abs(last_position - position) >= diff && self.val === true) {
            self.val = false;
            // set position
            self.curr_playing_file.seekTo(last_position * 1000);
          } else {
            // update position for display
            self.position = position;
          }
        } else if (position >= self.duration) {
          self.stop();
          self.setRecordingToPlay();
        }
      });
    }, 100);
  }

  togglePlayer(pause){
    this.is_playing = !pause;
    if(pause){
      this.curr_playing_file.pause();
    }else{
      this.curr_playing_file.play();
    }
  }

  fmtMSS(s) {
    return this.datePipe.transform(s * 1000, 'mm:ss');
  }

}
