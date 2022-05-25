import { Component, OnInit, ViewChild } from '@angular/core';
import { IonSearchbar, PopoverController } from '@ionic/angular';
import { Xassaid, XASSAIDS } from '../model/xassaid.model';
import { PopoverComponent } from '../popover/popover.component';
import { StorageService } from '../storage.service';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit{

  @ViewChild('search', { static: false}) search: IonSearchbar;
  public searchTerm: any;
  public xassaids: Xassaid[];
  picture: string;
  name: string;

  constructor(private storage: StorageService, private popover: PopoverController) {}

  ngOnInit() {}

  ionViewWillEnter(){
    this.storage.get('profil').then(res=>{
      this.picture = res.picture;
      this.name = res.name;
    });

    this.storage.get('xassaid').then(res =>{
      this.xassaids = res;
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

  openPopover(xassaid){
     this.popover.create({
        component:PopoverComponent,
        showBackdrop:false,
        componentProps: {
          xassaid: xassaid,
          xassaids: this.xassaids
        }
      }).then((popoverElement)=>{
       popoverElement.present();
     })
  }

}
