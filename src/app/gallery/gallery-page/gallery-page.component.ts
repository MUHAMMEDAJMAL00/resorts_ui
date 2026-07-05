import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Destination } from '../../core/models/destination.model';
import { GalleryImage } from '../../core/models/gallery-image.model';
import { DestinationsService } from '../../core/services/destinations.service';
import { GalleryService } from '../../core/services/gallery.service';

@Component({
  selector: 'app-gallery-page',
  templateUrl: './gallery-page.component.html',
  styleUrl: './gallery-page.component.css',
  standalone: false,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GalleryPageComponent {
  readonly destinations: Destination[];
  readonly images: GalleryImage[];

  constructor(destinationsService: DestinationsService, galleryService: GalleryService) {
    this.destinations = destinationsService.getDestinations();
    this.images = galleryService.getImages();
  }
}
