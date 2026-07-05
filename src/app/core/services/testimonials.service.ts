import { Injectable } from '@angular/core';
import { Testimonial } from '../models/testimonial.model';

@Injectable({ providedIn: 'root' })
export class TestimonialsService {
  private readonly testimonials: Testimonial[] = [
    {
      name: 'Anjali Menon',
      location: 'Kozhikode, Kerala',
      initials: 'AM',
      rating: 5,
      quote:
        'Just a two-hour drive from home, yet it feels like another world. The staff remembered every little preference by the second morning.',
    },
    {
      name: 'Arun Nair',
      location: 'Kochi, Kerala',
      initials: 'AN',
      rating: 5,
      quote:
        'From the pickup at Calicut airport to checkout, everything felt effortless. The infinity pool at sunset is worth the trip alone.',
    },
    {
      name: 'Rakesh Gowda',
      location: 'Bengaluru, Karnataka',
      initials: 'RG',
      rating: 5,
      quote:
        'We drive up from Bengaluru every monsoon. Misty mornings, hot filter coffee on the balcony and total quiet — it never gets old.',
    },
    {
      name: 'Thomas Kurian',
      location: 'Thrissur, Kerala',
      initials: 'TK',
      rating: 4,
      quote:
        'Beautiful grounds and genuinely warm service. The Kerala sadhya at the restaurant was the best we have had outside home.',
    },
    {
      name: 'Deepthi Shetty',
      location: 'Mangaluru, Karnataka',
      initials: 'DS',
      rating: 5,
      quote:
        'A weekend away with three kids and we never once felt stretched. The kids club and the lagoon pool made the holiday for them.',
    },
  ];

  getTestimonials(): Testimonial[] {
    return this.testimonials;
  }
}
