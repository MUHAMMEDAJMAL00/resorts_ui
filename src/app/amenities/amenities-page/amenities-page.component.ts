import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Amenity } from '../../core/models/amenity.model';
import { AmenitiesService } from '../../core/services/amenities.service';

@Component({
  selector: 'app-amenities-page',
  templateUrl: './amenities-page.component.html',
  styleUrl: './amenities-page.component.css',
  standalone: false,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AmenitiesPageComponent {
  readonly amenities: Amenity[];

  constructor(amenitiesService: AmenitiesService) {
    this.amenities = amenitiesService.getAmenities();
  }
}
