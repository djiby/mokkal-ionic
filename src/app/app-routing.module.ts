import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
     path: 'tabs',
     loadChildren: () => import('./tabs/tabs.module').then(m => m.TabsPageModule)
  },
  {
    path: 'profil-creation',
    loadChildren: () => import('./profil-creation/profil-creation.module').then( m => m.ProfilCreationPageModule)
  },
  {
    path: 'xassaid-learned',
    loadChildren: () => import('./xassaid-learned/xassaid-learned.module').then( m => m.XassaidLearnedPageModule)
  },
  {
    path: 'xassaid-to-learn',
    loadChildren: () => import('./xassaid-to-learn/xassaid-to-learn.module').then( m => m.XassaidToLearnPageModule)
  },
  {
    path: 'profil-created',
    loadChildren: () => import('./profil-created/profil-created.module').then( m => m.ProfilCreatedPageModule)
  },
  {
     path: 'xassaid',
     loadChildren: () => import('./xassaid/xassaid.module').then( m => m.XassaidPageModule)
   },
  {
    path: 'splash-screen',
    loadChildren: () => import('./splash-screen/splash-screen.module').then( m => m.SplashScreenPageModule)
  }
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
