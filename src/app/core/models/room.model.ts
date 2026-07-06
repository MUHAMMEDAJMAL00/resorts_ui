export enum RoomType {
  Deluxe = 'Deluxe',
  Suite = 'Suite',
  Villa = 'Villa',
  Family = 'Family',
}

export interface RoomImage {
  src: string;
  alt: string;
}

export interface Room {
  id: string;
  name: string;
  type: RoomType;
  description: string;
  /** Longer copy shown on the room detail page. */
  longDescription: string;
  pricePerNight: number;
  maxGuests: number;
  image: string;
  imageAlt: string;
  /** Detail-page gallery — the room photo plus resort scenes. */
  images: RoomImage[];
  features: [string, string, string];
}
