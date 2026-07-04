import { Injectable } from '@angular/core';
import { GalleryImage } from '../models/gallery-image.model';

@Injectable({ providedIn: 'root' })
export class GalleryService {
  private readonly images: GalleryImage[] = [
    { src: 'assets/images/gallery/gallery-infinity-pool.svg', alt: 'Infinity pool merging with the ocean horizon at midday' },
    { src: 'assets/images/gallery/gallery-private-beach.svg', alt: 'Loungers and parasols lined along the private white-sand beach' },
    { src: 'assets/images/gallery/gallery-sunset-dining.svg', alt: 'Candle-lit dinner table set on the beach at sunset' },
    { src: 'assets/images/gallery/gallery-spa-suite.svg', alt: 'Spa treatment suite with open shutters facing the sea' },
    { src: 'assets/images/gallery/gallery-poolside-cabanas.svg', alt: 'Shaded poolside cabanas with white curtains and daybeds' },
    { src: 'assets/images/gallery/gallery-ocean-villa.svg', alt: 'Beachfront villa exterior with private plunge pool at dusk' },
    { src: 'assets/images/gallery/gallery-garden-walk.svg', alt: 'Stone pathway winding through tropical resort gardens' },
    { src: 'assets/images/gallery/gallery-lobby-lounge.svg', alt: 'Open-air lobby lounge with rattan seating and sea view' },
  ];

  getImages(): GalleryImage[] {
    return this.images;
  }
}
