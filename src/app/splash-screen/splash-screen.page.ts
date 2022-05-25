import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { StorageService } from '../storage.service';

@Component({
  selector: 'app-splash-screen',
  templateUrl: './splash-screen.page.html',
  styleUrls: ['./splash-screen.page.scss'],
})
export class SplashScreenPage implements OnInit {

  constructor(private storage: StorageService, private router: Router) {
    setTimeout(() => {
      this.navigate();
    }, 2000);
  }

  ngOnInit() {
  }

  navigate(){
    this.storage.get('profil').then(res=>{
      if(res && res.created){
        this.router.navigate(['/tabs']);
      }else{
        this.router.navigate(['/profil-creation']);
      }
    });
  }

}
