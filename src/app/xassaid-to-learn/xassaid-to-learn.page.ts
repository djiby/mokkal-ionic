import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { IonSearchbar } from '@ionic/angular';
import { Beuyit } from '../model/beuyit.model';
import { StorageService } from '../storage.service';

@Component({
  selector: 'app-xassaid-to-learn',
  templateUrl: './xassaid-to-learn.page.html',
  styleUrls: ['./xassaid-to-learn.page.scss'],
})
export class XassaidToLearnPage implements OnInit {

  @ViewChild('search', { static: false}) search: IonSearchbar;
  public searchTerm: any;
  public xassaids: any;

  constructor(private router: Router, private storage: StorageService) { }

  ngOnInit() {
    this.storage.get('xassaid').then(res=>{
      this.xassaids = res;
      this.searchTerm = this.xassaids;
    })
  }

  next(){
    this.storage.set('xassaid', this.xassaids);
    this.router.navigate(['/profil-created']);
  }

  filter(event){
    const val = event.target.value;
    this.searchTerm = this.xassaids;
    if(val && val.trim() != ''){
      this.searchTerm = this.searchTerm.filter((item: any) =>{
        return (item.name.toLowerCase().indexOf(val.toLowerCase()) > -1);
      });
    }

  }

  isToLearn(xassaid, event){
    xassaid.isToLearn = event.detail.checked;
    if(xassaid.isToLearn && !xassaid.beuyits){
      xassaid.beuyits = this.createBeuyite(xassaid.countBeuyite);
    }
    const i = this.xassaids.findIndex(x=> x.name == xassaid.name);
    this.xassaids[i] = xassaid;
  }

  createBeuyite(size: number){
    let beuyits = Array<Beuyit>(size);
    for(let i = 1; i <= size; i++){
      const beuyit = new Beuyit(i, false);
      beuyits.push(beuyit);
    }
    return beuyits;
  }

}
