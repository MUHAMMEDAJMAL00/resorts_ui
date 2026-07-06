import { NgModule } from '@angular/core';

import { SharedModule } from '../shared/shared.module';
import { RoomsRoutingModule } from './rooms-routing.module';
import { RoomDetailPageComponent } from './room-detail-page/room-detail-page.component';
import { RoomsPageComponent } from './rooms-page/rooms-page.component';

@NgModule({
  declarations: [RoomsPageComponent, RoomDetailPageComponent],
  imports: [SharedModule, RoomsRoutingModule],
})
export class RoomsModule {}
