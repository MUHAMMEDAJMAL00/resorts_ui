export interface DestinationImage {
  src: string;
  alt: string;
}

export interface Destination {
  name: string;
  distance: string;
  description: string;
  images: DestinationImage[];
}
