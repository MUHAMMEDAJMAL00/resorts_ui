import { NgModule } from '@angular/core';

import { SharedModule } from '../shared/shared.module';
import { AmenitiesRoutingModule } from './amenities-routing.module';
import { AmenitiesPageComponent } from './amenities-page/amenities-page.component';

@NgModule({
  declarations: [AmenitiesPageComponent],
  imports: [SharedModule, AmenitiesRoutingModule],
})
export class AmenitiesModule {}
