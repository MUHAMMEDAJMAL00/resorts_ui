import { Injectable } from '@angular/core';
import { Room, RoomType } from '../models/room.model';

@Injectable({ providedIn: 'root' })
export class RoomsService {
  private readonly rooms: Room[] = [
    {
      id: 'deluxe-ocean-view',
      name: 'Deluxe Ocean View',
      type: RoomType.Deluxe,
      description: 'Wake to endless blue horizons from your private balcony.',
      pricePerNight: 240,
      maxGuests: 2,
      image: 'assets/images/rooms/room-deluxe-ocean-view.jpg',
      imageAlt: 'Sun deck with parasols and loungers overlooking the water outside the deluxe rooms',
      features: ['King Bed', 'Ocean Balcony', '45 m²'],
    },
    {
      id: 'garden-retreat',
      name: 'Garden Retreat Room',
      type: RoomType.Deluxe,
      description: 'A serene hideaway opening onto lush tropical gardens.',
      pricePerNight: 190,
      maxGuests: 2,
      image: 'assets/images/rooms/room-garden-retreat.jpg',
      imageAlt: 'Warm wooden room with a platform bed and glass doors opening to a tropical garden',
      features: ['Queen Bed', 'Garden Patio', '40 m²'],
    },
    {
      id: 'junior-suite',
      name: 'Junior Suite',
      type: RoomType.Suite,
      description: 'Extra space to unwind, with a lounge and sweeping sea views.',
      pricePerNight: 320,
      maxGuests: 3,
      image: 'assets/images/rooms/room-junior-suite.jpg',
      imageAlt: 'Elegant junior suite with a tufted sofa, lamps and a curtained king bed',
      features: ['Lounge Area', 'Sea View', '60 m²'],
    },
    {
      id: 'presidential-suite',
      name: 'Presidential Suite',
      type: RoomType.Suite,
      description: 'Our finest suite — a private terrace and dedicated butler.',
      pricePerNight: 540,
      maxGuests: 4,
      image: 'assets/images/rooms/room-presidential-suite.jpg',
      imageAlt: 'Open-plan presidential suite with a platform bed, lounge and panoramic windows',
      features: ['Private Terrace', 'Butler Service', '110 m²'],
    },
    {
      id: 'beachfront-villa',
      name: 'Beachfront Villa',
      type: RoomType.Villa,
      description: 'Step from your private pool straight onto powder-white sand.',
      pricePerNight: 760,
      maxGuests: 6,
      image: 'assets/images/rooms/room-beachfront-villa.jpg',
      imageAlt: 'Villa pavilion beside its private pool glowing under an evening sky',
      features: ['Private Pool', 'Direct Beach', '150 m²'],
    },
    {
      id: 'family-lagoon',
      name: 'Family Lagoon Room',
      type: RoomType.Family,
      description: 'Room to play and space to rest, beside the calm lagoon pool.',
      pricePerNight: 280,
      maxGuests: 5,
      image: 'assets/images/rooms/room-family-lagoon.jpg',
      imageAlt: 'Spacious family room with a lounge, kitchenette and soft carpeted play area',
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
