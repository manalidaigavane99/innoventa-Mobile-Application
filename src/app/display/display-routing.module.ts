import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DisplayPage } from "./display.Page";

const routes: Routes = [
  {
    path: '',
    component: DisplayPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DisplayPageRoutingModule {}
