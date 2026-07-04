import { NgOptimizedImage } from '@angular/common';
import { NgModule } from '@angular/core';

import { SharedModule } from '../shared/shared.module';
import { AboutRoutingModule } from './about-routing.module';
import { AboutPageComponent } from './about-page/about-page.component';

@NgModule({
  declarations: [AboutPageComponent],
  imports: [SharedModule, AboutRoutingModule, NgOptimizedImage],
})
export class AboutModule {}
