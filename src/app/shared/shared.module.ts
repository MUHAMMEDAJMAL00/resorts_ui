import { CommonModule, NgOptimizedImage } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { PageBannerComponent } from './components/page-banner/page-banner.component';
import { RoomCardComponent } from './components/room-card/room-card.component';
import { SectionHeaderComponent } from './components/section-header/section-header.component';
import { StarRatingComponent } from './components/star-rating/star-rating.component';
import { ClipRevealDirective } from './directives/clip-reveal.directive';
import { MagneticDirective } from './directives/magnetic.directive';
import { ParallaxDirective } from './directives/parallax.directive';
import { RevealDirective } from './directives/reveal.directive';

@NgModule({
  declarations: [
    SectionHeaderComponent,
    PageBannerComponent,
    StarRatingComponent,
    RoomCardComponent,
    RevealDirective,
    ClipRevealDirective,
    ParallaxDirective,
    MagneticDirective,
  ],
  imports: [CommonModule, RouterModule, NgOptimizedImage],
  exports: [
    CommonModule,
    SectionHeaderComponent,
    PageBannerComponent,
    StarRatingComponent,
    RoomCardComponent,
    RevealDirective,
    ClipRevealDirective,
    ParallaxDirective,
    MagneticDirective,
  ],
})
export class SharedModule {}
