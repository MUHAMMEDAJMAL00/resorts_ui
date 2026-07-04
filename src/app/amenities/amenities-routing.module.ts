import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AmenitiesPageComponent } from './amenities-page/amenities-page.component';

const routes: Routes = [{ path: '', component: AmenitiesPageComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AmenitiesRoutingModule {}
