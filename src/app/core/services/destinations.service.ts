import { Injectable } from '@angular/core';
import { Destination } from '../models/destination.model';

@Injectable({ providedIn: 'root' })
export class DestinationsService {
  private readonly destinations: Destination[] = [
    {
      name: 'Chembra Peak',
      distance: '17 km',
      description:
        'The highest peak in Wayanad at 2,100 m, famous for the heart-shaped Chembra Lake halfway up the trek. The guided climb through grasslands and mist takes about three hours and rewards you with views across the whole district.',
      images: [
        {
          src: 'assets/images/hero/hero-heart-lake.jpg',
          alt: 'Heart-shaped lake ringed by green grasslands on the Chembra Peak trek',
        },
        {
          src: 'assets/images/banners/banner-grassland-pond.jpg',
          alt: 'Rolling green meadows and a quiet pond on the way up Chembra Peak',
        },
      ],
    },
    {
      name: 'Banasura Sagar Dam',
      distance: '21 km',
      description:
        'The largest earthen dam in India, holding back a reservoir dotted with small islands against the Banasura hills. Take a speed-boat ride between the islands or walk the dam top for sweeping sunset views.',
      images: [
        {
          src: 'assets/images/destinations/dest-banasura-lake.jpg',
          alt: 'Turquoise reservoir with boats framed by rocky hills at Banasura Sagar',
        },
        {
          src: 'assets/images/destinations/dest-banasura-boating.jpg',
          alt: 'Bow of a wooden boat gliding across the calm Banasura reservoir',
        },
      ],
    },
    {
      name: 'Soochipara Falls',
      distance: '22 km',
      description:
        'A three-tiered waterfall dropping nearly 200 m through dense evergreen forest near Meppadi. A short trek leads to the plunge pool, and the cliff face beside the falls is a favourite spot for rock climbing.',
      images: [
        {
          src: 'assets/images/destinations/dest-soochipara-falls.jpg',
          alt: 'Tall waterfall cascading down mossy cliffs surrounded by lush forest',
        },
        {
          src: 'assets/images/gallery/gallery-forest-stream.jpg',
          alt: 'Forest stream tumbling over rocks below the falls',
        },
      ],
    },
    {
      name: 'Pookode Lake',
      distance: '3 km',
      description:
        'A freshwater lake shaped like India’s map, cradled by evergreen forest just below Vythiri. Pedal boats, a small aquarium and a walking path around the shore make it an easy, lovely evening outing from the resort.',
      images: [
        {
          src: 'assets/images/destinations/dest-pookode-pier.jpg',
          alt: 'Wooden pier reaching into the calm forest-ringed Pookode Lake',
        },
        {
          src: 'assets/images/destinations/dest-pookode-boathouse.jpg',
          alt: 'Boathouse on still water with wooded hills rising behind',
        },
      ],
    },
    {
      name: 'Edakkal Caves',
      distance: '28 km',
      description:
        'Two natural rock chambers high on Ambukuthi Hill, sheltering petroglyphs carved more than 6,000 years ago — among the oldest human engravings in India. The 45-minute climb passes coffee estates and ends in panoramic views.',
      images: [
        {
          src: 'assets/images/gallery/gallery-heritage-village.jpg',
          alt: 'Traditional thatched heritage village on the green slopes near Edakkal',
        },
        {
          src: 'assets/images/about/about-resort-story.jpg',
          alt: 'Misty Ambukuthi hills rising above the valley at sunrise',
        },
      ],
    },
    {
      name: 'Kuruvadweep',
      distance: '40 km',
      description:
        'A 950-acre cluster of uninhabited islands in the Kabini river, threaded with bamboo groves and rope bridges. Wade between islets, spot rare orchids and birds, and picnic on the river banks in near-total silence.',
      images: [
        {
          src: 'assets/images/destinations/dest-kuruva-bridge.jpg',
          alt: 'Footbridge leading into the dense green forests of Kuruvadweep',
        },
        {
          src: 'assets/images/destinations/dest-kuruva-forest.jpg',
          alt: 'Sunlit path winding through tall trees on the river island',
        },
      ],
    },
    {
      name: 'Lakkidi View Point',
      distance: '5 km',
      description:
        'The gateway of Wayanad, perched at the top of the Thamarassery ghat pass. Watch clouds drift below the road’s nine hairpin bends, with tea gardens and the plains of Kozhikode stretching out beneath you.',
      images: [
        {
          src: 'assets/images/gallery/gallery-ghat-hairpin.jpg',
          alt: 'Aerial view of the ghat road hairpin bend at dusk near Lakkidi',
        },
        {
          src: 'assets/images/gallery/gallery-tea-plantation-road.jpg',
          alt: 'Road winding through emerald tea plantations below the view point',
        },
      ],
    },
  ];

  getDestinations(): Destination[] {
    return this.destinations;
  }
}
