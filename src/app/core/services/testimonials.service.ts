import { Injectable } from '@angular/core';
import { Testimonial } from '../models/testimonial.model';

@Injectable({ providedIn: 'root' })
export class TestimonialsService {
  private readonly testimonials: Testimonial[] = [
    {
      name: 'Sarah Mitchell',
      location: 'London, UK',
      initials: 'SM',
      rating: 5,
      quote:
        'The most restful week we have had in years. The staff remembered every detail, and the ocean-view suite was breathtaking.',
    },
    {
      name: 'Arun Nair',
      location: 'Kochi, India',
      initials: 'AN',
      rating: 5,
      quote:
        'From airport pickup to checkout, everything felt effortless. The infinity pool at sunset is worth the trip alone.',
    },
    {
      name: 'Elena Rossi',
      location: 'Milan, Italy',
      initials: 'ER',
      rating: 4,
      quote:
        'Beautiful grounds, exceptional dining and a spa that rivals the best in Europe. We are already planning our return.',
    },
    {
      name: 'James Carter',
      location: 'Sydney, Australia',
      initials: 'JC',
      rating: 5,
      quote:
        'We travelled with three kids and never once felt stretched. The kids club and lagoon pool made the holiday for them.',
    },
  ];

  getTestimonials(): Testimonial[] {
    return this.testimonials;
  }
}
