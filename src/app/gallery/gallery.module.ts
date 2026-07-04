import { NgOptimizedImage } from '@angular/common';
import { NgModule } from '@angular/core';

import { SharedModule } from '../shared/shared.module';
import { GalleryRoutingModule } from './gallery-routing.module';
import { GalleryPageComponent } from './gallery-page/gallery-page.component';

@NgModule({
  declarations: [GalleryPageComponent],
  imports: [SharedModule, GalleryRoutingModule, NgOptimizedImage],
})
export class GalleryModule {}
