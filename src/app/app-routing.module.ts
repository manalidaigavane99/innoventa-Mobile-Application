import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { RubricPageModule } from './home/rubric/rubric.module';

const routes: Routes = [
  { path: '', redirectTo: 'auth', pathMatch: 'full' },
  { path: 'home', loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)},
  {
    path: 'auth',
    loadChildren: () => import('./auth/auth.module').then( m => m.AuthPageModule)
  },
  {
    path: 'rubric',
    loadChildren: () => import('./home/rubric/rubric.module').then( m => m.RubricPageModule)
  },
  {
    path: 'group-info',
    loadChildren: () => import('./group-info/group-info.module').then( m => m.GroupInfoPageModule)
  },
  {
    path: 'qr',
    loadChildren: () => import('./qr/qr.module').then( m => m.QRPageModule)
  },
  {
    path: 'display',
    loadChildren: () => import('./display/display.module').then( m => m.DisplayPageModule)
  },
  {
    path: 'feedback',
    loadChildren: () => import('./feedback/feedback.module').then( m => m.FeedbackPageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }),
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
