import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import {GroupComponent} from './group/group.component';
import {HomeComponent} from './home/home.component';
import {SendComponent} from './send/send.component';




const routes: Routes = [
  {path: 'grouplist', component: GroupComponent},
  {path: '', component: HomeComponent},
  {path: 'sendmessage', component: SendComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
