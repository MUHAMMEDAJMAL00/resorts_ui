import { NgOptimizedImage } from '@angular/common';
import { NgModule } from '@angular/core';

import { SharedModule } from '../shared/shared.module';
import { AboutPreviewComponent } from './components/about-preview/about-preview.component';
import { BookingCtaComponent } from './components/booking-cta/booking-cta.component';
import { HeroSliderComponent } from './components/hero-slider/hero-slider.component';
import { StatsComponent } from './components/stats/stats.component';
import { TestimonialsComponent } from './components/testimonials/testimonials.component';
import { HomeRoutingModule } from './home-routing.module';
import { HomePageComponent } from './home-page/home-page.component';

@NgModule({
  declarations: [
    HomePageComponent,
    HeroSliderComponent,
    AboutPreviewComponent,
    StatsComponent,
    TestimonialsComponent,
    BookingCtaComponent,
  ],
  imports: [SharedModule, HomeRoutingModule, NgOptimizedImage],
})
export class HomeModule {}
