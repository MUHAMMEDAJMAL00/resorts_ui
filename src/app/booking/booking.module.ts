import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

import { SharedModule } from '../shared/shared.module';
import { BookingRoutingModule } from './booking-routing.module';
import { BookingPageComponent } from './booking-page/booking-page.component';

@NgModule({
  declarations: [BookingPageComponent],
  imports: [SharedModule, BookingRoutingModule, ReactiveFormsModule],
})
export class BookingModule {}
