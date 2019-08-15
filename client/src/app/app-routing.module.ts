import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import {GroupComponent} from './group/group.component';
import {HomeComponent} from './home/home.component';




const routes: Routes = [
  {path: 'grouplist', component: GroupComponent},
  {path: '', component: HomeComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
