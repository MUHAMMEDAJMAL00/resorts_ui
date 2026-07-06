import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { RoomDetailPageComponent } from './room-detail-page/room-detail-page.component';
import { RoomsPageComponent } from './rooms-page/rooms-page.component';

const routes: Routes = [
  { path: '', component: RoomsPageComponent },
  { path: ':id', component: RoomDetailPageComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RoomsRoutingModule {}
