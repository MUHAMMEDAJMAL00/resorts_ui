import { NgOptimizedImage } from '@angular/common';
import { NgModule } from '@angular/core';

import { SharedModule } from '../shared/shared.module';
import { GalleryRoutingModule } from './gallery-routing.module';
import { GalleryPageComponent } from './gallery-page/gallery-page.component';
import { DestinationCardComponent } from './components/destination-card/destination-card.component';

@NgModule({
  declarations: [GalleryPageComponent, DestinationCardComponent],
  imports: [SharedModule, GalleryRoutingModule, NgOptimizedImage],
})
export class GalleryModule {}
