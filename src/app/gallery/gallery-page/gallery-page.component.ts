import { ChangeDetectionStrategy, Component } from '@angular/core';
import { GalleryImage } from '../../core/models/gallery-image.model';
import { GalleryService } from '../../core/services/gallery.service';

@Component({
  selector: 'app-gallery-page',
  templateUrl: './gallery-page.component.html',
  styleUrl: './gallery-page.component.css',
  standalone: false,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GalleryPageComponent {
  readonly images: GalleryImage[];

  constructor(galleryService: GalleryService) {
    this.images = galleryService.getImages();
  }
}
