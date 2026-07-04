import { Injectable } from '@angular/core';
import { Amenity } from '../models/amenity.model';

@Injectable({ providedIn: 'root' })
export class AmenitiesService {
  private readonly amenities: Amenity[] = [
    {
      icon: 'fa-solid fa-water-ladder',
      title: 'Infinity Pool',
      description: 'A horizon-edge pool overlooking the ocean, open dawn to dusk.',
    },
    {
      icon: 'fa-solid fa-spa',
      title: 'Ocean-View Spa',
      description: 'Signature treatments in suites that open to the sea breeze.',
    },
    {
      icon: 'fa-solid fa-utensils',
      title: 'Fine Dining',
      description: 'Three restaurants, from beach grill to chef’s tasting menu.',
    },
    {
      icon: 'fa-solid fa-umbrella-beach',
      title: 'Private Beach',
      description: '400 metres of white sand reserved exclusively for guests.',
    },
    {
      icon: 'fa-solid fa-dumbbell',
      title: 'Fitness Studio',
      description: 'Modern equipment, sunrise yoga and personal training.',
    },
    {
      icon: 'fa-solid fa-person-swimming',
      title: 'Water Sports',
      description: 'Kayaks, paddleboards, snorkelling and sunset sailing trips.',
    },
    {
      icon: 'fa-solid fa-child-reaching',
      title: 'Kids Club',
      description: 'Supervised play and crafts daily, for ages four to twelve.',
    },
    {
      icon: 'fa-solid fa-bell-concierge',
      title: '24/7 Concierge',
      description: 'Around-the-clock service for excursions, dining and more.',
    },
    {
      icon: 'fa-solid fa-car',
      title: 'Airport Transfer',
      description: 'Private chauffeured transfers to and from the airport.',
    },
  ];

  getAmenities(): Amenity[] {
    return this.amenities;
  }
}
