import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { IonSearchbar } from '@ionic/angular';
import { XASSAIDS } from '../model/xassaid.model';
import { StorageService } from '../storage.service';

@Component({
  selector: 'app-xassaid-learned',
  templateUrl: './xassaid-learned.page.html',
  styleUrls: ['./xassaid-learned.page.scss'],
})
export class XassaidLearnedPage implements OnInit {

  @ViewChild('search', { static: false}) search: IonSearchbar;
  public searchTerm: any;
  public xassaids = XASSAIDS;

  constructor(private router: Router, private storage: StorageService) {}

  ngOnInit() {
    this.searchTerm = this.xassaids;
  }

  next(){
    this.storage.set('xassaid', this.xassaids);
    this.router.navigate(['/xassaid-to-learn']);
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

}
