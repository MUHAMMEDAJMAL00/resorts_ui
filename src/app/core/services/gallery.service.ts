import { Injectable } from '@angular/core';
import { GalleryImage } from '../models/gallery-image.model';

@Injectable({ providedIn: 'root' })
export class GalleryService {
  private readonly images: GalleryImage[] = [
    {
      src: 'assets/images/gallery/gallery-tea-plantation-road.jpg',
      alt: 'Winding road curving through emerald tea plantations in the hills',
    },
    {
      src: 'assets/images/gallery/gallery-grassland-pond.jpg',
      alt: 'Rolling green grasslands surrounding a quiet mountain pond under a soft sky',
    },
    {
      src: 'assets/images/gallery/gallery-heritage-village.jpg',
      alt: 'Traditional thatched-roof heritage village terraced into a green hillside',
    },
    {
      src: 'assets/images/gallery/gallery-ghat-hairpin.jpg',
      alt: 'Aerial view of the forest ghat road hairpin bend glowing at dusk',
    },
    {
      src: 'assets/images/gallery/gallery-forest-stream.jpg',
      alt: 'Stream tumbling over rocks through dense rainforest below the hills',
    },
  ];

  getImages(): GalleryImage[] {
    return this.images;
  }
}
