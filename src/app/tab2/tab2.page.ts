import { Component, OnInit } from '@angular/core';
import { Xassaid } from '../model/xassaid.model';
import { StorageService } from '../storage.service';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page implements OnInit{

  picture: string;
  sumBeuyite: number = 0;
  sunBeuyiteIsLearned: number = 0;
  percentBeuyiteIsLearned: number = 0;
  sumXassaid: number = 0;
  sumXassaidIsLearned: number = 0;
  percentXassaidIsLearned: number = 0;

  pictureXassaidToLearn: string;
  countBeuyiteLearned: number;
  countBeuyiteToLearn: number;
  xassaidToLearn: string;

  constructor(private storage: StorageService) {}

  ngOnInit() {
    this.storage.get('profil').then(res=>{
      this.picture = res.picture;
    });
  }

  ionViewWillEnter(){

    this.storage.get('xassaid').then(res =>{
      this.initProgress(res);
      this.initLearnd(res);
    });
  }

  initProgress(res: Array<Xassaid>){
    this.sumBeuyite = res.map(r => r.countBeuyite).reduce((sum, current) => sum + current);
      this.sunBeuyiteIsLearned = 0;
      const b = res.filter(r => r.isToLearn).map(r => r.beuyits);
      b.forEach(el => {
        this.sunBeuyiteIsLearned = this.sunBeuyiteIsLearned + el.filter(b => b.isLearned).length;
      });
      this.sunBeuyiteIsLearned = this.sunBeuyiteIsLearned + res.filter(r => r.isLearned).map(r => r.countBeuyite).reduce((sum, current) => sum + current);
      this.percentBeuyiteIsLearned = this.sunBeuyiteIsLearned / this.sumBeuyite;
      
      this.sumXassaid = res.length;
      this.sumXassaidIsLearned = res.filter(r => r.isLearned).length;
      this.percentXassaidIsLearned = this.sumXassaidIsLearned / this.sumXassaid;
  }

  initLearnd(res: Array<Xassaid>){
    const xassaid = res.filter(xa => !xa.isLearned && xa.isToLearn)[0];
    const beuyite = xassaid.beuyits.filter(b => b.isDownload && !b.isLearned);
    this.pictureXassaidToLearn = beuyite[beuyite.length-1] ? beuyite[beuyite.length-1].picture : '';
    this.countBeuyiteLearned = xassaid.countLearned;
    this.countBeuyiteToLearn = xassaid.countBeuyite;
    this.xassaidToLearn = xassaid.name;
  }

}
