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
      image: 'assets/images/rooms/room-deluxe-ocean-view.svg',
      imageAlt: 'Deluxe room with a king bed facing floor-to-ceiling ocean-view windows',
      features: ['King Bed', 'Ocean Balcony', '45 m²'],
    },
    {
      id: 'garden-retreat',
      name: 'Garden Retreat Room',
      type: RoomType.Deluxe,
      description: 'A serene hideaway opening onto lush tropical gardens.',
      pricePerNight: 190,
      maxGuests: 2,
      image: 'assets/images/rooms/room-garden-retreat.svg',
      imageAlt: 'Cozy room with a queen bed and patio doors opening to a tropical garden',
      features: ['Queen Bed', 'Garden Patio', '40 m²'],
    },
    {
      id: 'junior-suite',
      name: 'Junior Suite',
      type: RoomType.Suite,
      description: 'Extra space to unwind, with a lounge and sweeping sea views.',
      pricePerNight: 320,
      maxGuests: 3,
      image: 'assets/images/rooms/room-junior-suite.svg',
      imageAlt: 'Junior suite with a separate lounge area and panoramic sea view',
      features: ['Lounge Area', 'Sea View', '60 m²'],
    },
    {
      id: 'presidential-suite',
      name: 'Presidential Suite',
      type: RoomType.Suite,
      description: 'Our finest suite — a private terrace and dedicated butler.',
      pricePerNight: 540,
      maxGuests: 4,
      image: 'assets/images/rooms/room-presidential-suite.svg',
      imageAlt: 'Expansive presidential suite with dining area and private ocean terrace',
      features: ['Private Terrace', 'Butler Service', '110 m²'],
    },
    {
      id: 'beachfront-villa',
      name: 'Beachfront Villa',
      type: RoomType.Villa,
      description: 'Step from your private pool straight onto powder-white sand.',
      pricePerNight: 760,
      maxGuests: 6,
      image: 'assets/images/rooms/room-beachfront-villa.svg',
      imageAlt: 'Standalone villa with private plunge pool and direct beach access',
      features: ['Private Pool', 'Direct Beach', '150 m²'],
    },
    {
      id: 'family-lagoon',
      name: 'Family Lagoon Room',
      type: RoomType.Family,
      description: 'Room to play and space to rest, beside the calm lagoon pool.',
      pricePerNight: 280,
      maxGuests: 5,
      image: 'assets/images/rooms/room-family-lagoon.svg',
      imageAlt: 'Family room with two queen beds and a kids corner overlooking the lagoon pool',
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
