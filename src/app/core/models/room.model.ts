export enum RoomType {
  Deluxe = 'Deluxe',
  Suite = 'Suite',
  Villa = 'Villa',
  Family = 'Family',
}

export interface Room {
  id: string;
  name: string;
  type: RoomType;
  description: string;
  pricePerNight: number;
  maxGuests: number;
  image: string;
  imageAlt: string;
  features: [string, string, string];
}
