import { Injectable } from '@angular/core';
import { Room, RoomType } from '../models/room.model';

// Shared resort scenes reused across the detail-page galleries until each
// room has its own full photo set.
const SCENE = {
  pool: {
    src: 'assets/images/hero/hero-resort-pool-mountains.jpg',
    alt: 'Turquoise resort pool surrounded by palm trees beneath green mountains',
  },
  lobby: {
    src: 'assets/images/about/about-resort-lobby.jpg',
    alt: 'Open-air resort lobby and pool pavilion glowing warmly at dusk',
  },
  spa: {
    src: 'assets/images/cta/cta-spa-terrace.jpg',
    alt: 'Spa terrace loungers overlooking sunlit mountains at golden hour',
  },
  lodge: {
    src: 'assets/images/hero/hero-lodge-sunset-pool.jpg',
    alt: 'Warmly lit wooden resort lodge with poolside loungers at sunset',
  },
  stream: {
    src: 'assets/images/gallery/gallery-forest-stream.jpg',
    alt: 'Clear forest stream running over smooth stones near the resort',
  },
  grassland: {
    src: 'assets/images/gallery/gallery-grassland-pond.jpg',
    alt: 'Quiet grassland pond in soft morning light',
  },
};

@Injectable({ providedIn: 'root' })
export class RoomsService {
  private readonly rooms: Room[] = [
    {
      id: 'deluxe-ocean-view',
      name: 'Deluxe Ocean View',
      type: RoomType.Deluxe,
      description: 'Wake to endless blue horizons from your private balcony.',
      longDescription:
        'Perched on the resort’s highest terrace, the Deluxe Ocean View pairs a plush king bed with floor-to-ceiling glass that opens onto your own balcony. Fall asleep to the sound of the bay and wake to a horizon that never ends — breakfast can be served right at your railing.',
      pricePerNight: 240,
      maxGuests: 2,
      image: 'assets/images/rooms/room-deluxe-ocean-view.jpg',
      imageAlt: 'Sun deck with parasols and loungers overlooking the water outside the deluxe rooms',
      images: [
        {
          src: 'assets/images/rooms/room-deluxe-ocean-view.jpg',
          alt: 'Sun deck with parasols and loungers overlooking the water outside the deluxe rooms',
        },
        SCENE.spa,
        SCENE.lobby,
        SCENE.lodge,
      ],
      features: ['King Bed', 'Ocean Balcony', '45 m²'],
    },
    {
      id: 'garden-retreat',
      name: 'Garden Retreat Room',
      type: RoomType.Deluxe,
      description: 'A serene hideaway opening onto lush tropical gardens.',
      longDescription:
        'Tucked into the quietest corner of the grounds, the Garden Retreat opens straight onto shaded tropical greenery. A private patio, a deep queen bed and the constant hush of birdsong make this the room our returning guests ask for by name.',
      pricePerNight: 190,
      maxGuests: 2,
      image: 'assets/images/rooms/room-garden-retreat.jpg',
      imageAlt: 'Warm wooden room with a platform bed and glass doors opening to a tropical garden',
      images: [
        {
          src: 'assets/images/rooms/room-garden-retreat.jpg',
          alt: 'Warm wooden room with a platform bed and glass doors opening to a tropical garden',
        },
        SCENE.stream,
        SCENE.grassland,
        SCENE.lobby,
      ],
      features: ['Queen Bed', 'Garden Patio', '40 m²'],
    },
    {
      id: 'junior-suite',
      name: 'Junior Suite',
      type: RoomType.Suite,
      description: 'Extra space to unwind, with a lounge and sweeping sea views.',
      longDescription:
        'The Junior Suite adds a full sitting lounge to the classic sea-view room — sixty square metres of soft light, linen and space to spread out. Ideal for longer stays, with a curtained king bed, writing desk and an evening view that earns its own armchair.',
      pricePerNight: 320,
      maxGuests: 3,
      image: 'assets/images/rooms/room-junior-suite.jpg',
      imageAlt: 'Elegant junior suite with a tufted sofa, lamps and a curtained king bed',
      images: [
        {
          src: 'assets/images/rooms/room-junior-suite.jpg',
          alt: 'Elegant junior suite with a tufted sofa, lamps and a curtained king bed',
        },
        SCENE.lobby,
        SCENE.spa,
        SCENE.pool,
      ],
      features: ['Lounge Area', 'Sea View', '60 m²'],
    },
    {
      id: 'presidential-suite',
      name: 'Presidential Suite',
      type: RoomType.Suite,
      description: 'Our finest suite — a private terrace and dedicated butler.',
      longDescription:
        'Our signature address: an open-plan suite wrapped in panoramic glass, with a private terrace, dining for six and a dedicated butler on call around the clock. Every detail — from the pillow menu to the sunset champagne — is arranged before you think to ask.',
      pricePerNight: 540,
      maxGuests: 4,
      image: 'assets/images/rooms/room-presidential-suite.jpg',
      imageAlt: 'Open-plan presidential suite with a platform bed, lounge and panoramic windows',
      images: [
        {
          src: 'assets/images/rooms/room-presidential-suite.jpg',
          alt: 'Open-plan presidential suite with a platform bed, lounge and panoramic windows',
        },
        SCENE.spa,
        SCENE.lodge,
        SCENE.lobby,
      ],
      features: ['Private Terrace', 'Butler Service', '110 m²'],
    },
    {
      id: 'beachfront-villa',
      name: 'Beachfront Villa',
      type: RoomType.Villa,
      description: 'Step from your private pool straight onto powder-white sand.',
      longDescription:
        'A standalone pavilion where the garden gate opens directly onto the beach. Your private pool, outdoor rain shower and shaded sala are yours alone; the villa host handles everything else, from beach barbecues to sunrise kayak launches.',
      pricePerNight: 760,
      maxGuests: 6,
      image: 'assets/images/rooms/room-beachfront-villa.jpg',
      imageAlt: 'Villa pavilion beside its private pool glowing under an evening sky',
      images: [
        {
          src: 'assets/images/rooms/room-beachfront-villa.jpg',
          alt: 'Villa pavilion beside its private pool glowing under an evening sky',
        },
        SCENE.pool,
        SCENE.spa,
        SCENE.lodge,
      ],
      features: ['Private Pool', 'Direct Beach', '150 m²'],
    },
    {
      id: 'family-lagoon',
      name: 'Family Lagoon Room',
      type: RoomType.Family,
      description: 'Room to play and space to rest, beside the calm lagoon pool.',
      longDescription:
        'Built for families who holiday together: two queen beds, a lounge with a kitchenette and a carpeted kids’ corner stocked with games. The calm lagoon pool is steps away — shallow, warm and watched over by the lifeguard all day.',
      pricePerNight: 280,
      maxGuests: 5,
      image: 'assets/images/rooms/room-family-lagoon.jpg',
      imageAlt: 'Spacious family room with a lounge, kitchenette and soft carpeted play area',
      images: [
        {
          src: 'assets/images/rooms/room-family-lagoon.jpg',
          alt: 'Spacious family room with a lounge, kitchenette and soft carpeted play area',
        },
        SCENE.pool,
        SCENE.lobby,
        SCENE.grassland,
      ],
      features: ['2 Queen Beds', 'Kids Corner', '65 m²'],
    },
  ];

  getRooms(): Room[] {
    return this.rooms;
  }

  getRoomById(id: string): Room | undefined {
    return this.rooms.find((room) => room.id === id);
  }
}
