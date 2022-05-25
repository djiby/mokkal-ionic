import { Component, OnInit } from '@angular/core';
import { PopoverController } from '@ionic/angular';
import { Beuyit } from '../model/beuyit.model';
import { Xassaid } from '../model/xassaid.model';
import { StorageService } from '../storage.service';

@Component({
  selector: 'app-popover',
  templateUrl: './popover.component.html',
  styleUrls: ['./popover.component.scss'],
})
export class PopoverComponent implements OnInit {

  xassaid: Xassaid;
  xassaids: Xassaid[];

  constructor(private popover: PopoverController, private storage: StorageService) { }

  ngOnInit() {}

  closePopover(){
     this.popover.dismiss();
  }

  isLearned(event){
    this.xassaid.isLearned = event.detail.checked;
    const i = this.xassaids.findIndex(x=> x.name == this.xassaid.name);
    this.xassaids[i] = this.xassaid;
    this.storage.set('xassaid', this.xassaids);
    this.popover.dismiss();
  }

  isToLearn(event){
    this.xassaid.isToLearn = event.detail.checked;
    const i = this.xassaids.findIndex(x=> x.name == this.xassaid.name);
    this.xassaids[i] = this.xassaid;
    if(this.xassaid.isToLearn && !this.xassaid.beuyits){
      this.xassaid.beuyits = this.createBeuyite(this.xassaid.countBeuyite);
    }
    this.storage.set('xassaid', this.xassaids);
    this.popover.dismiss();
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
