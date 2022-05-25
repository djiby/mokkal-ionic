import { Component, OnInit, ViewChild } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { IonSearchbar } from '@ionic/angular';
import { Xassaid } from '../model/xassaid.model';
import { StorageService } from '../storage.service';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page implements OnInit{

  @ViewChild('search', { static: false}) search: IonSearchbar;
  public searchTerm: any;
  public xassaids: Xassaid[];
  picture: string;

  constructor(private storage: StorageService, private router: Router) {}

  ngOnInit() {
    this.storage.get('profil').then(res=>{
      this.picture = res.picture;
    });
  }

  ionViewWillEnter(){
    this.storage.get('xassaid').then(res =>{
      this.xassaids = res.filter(xa => !xa.isLearned && xa.isToLearn);
      this.searchTerm = this.xassaids;
    });
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

  learnXassaid(xassaid){
    let navigationExtras: NavigationExtras = {
      queryParams: {
        data: JSON.stringify(xassaid)
      }
    };
    this.router.navigate(['/xassaid'], navigationExtras);
  }

}
