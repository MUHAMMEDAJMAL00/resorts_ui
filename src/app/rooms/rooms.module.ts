import { NgModule } from '@angular/core';

import { SharedModule } from '../shared/shared.module';
import { RoomsRoutingModule } from './rooms-routing.module';
import { RoomsPageComponent } from './rooms-page/rooms-page.component';

@NgModule({
  declarations: [RoomsPageComponent],
  imports: [SharedModule, RoomsRoutingModule],
})
export class RoomsModule {}
