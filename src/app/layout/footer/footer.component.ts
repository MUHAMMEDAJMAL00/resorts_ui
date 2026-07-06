import { ChangeDetectionStrategy, Component, inject } from '@angular/core';

import { MotionService } from '../../core/services/motion.service';

interface FooterLink {
  label: string;
  path: string;
}

interface SocialLink {
  label: string;
  icon: string;
  url: string;
}

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.css',
  standalone: false,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FooterComponent {
  private readonly motion = inject(MotionService);

  readonly year = new Date().getFullYear();

  readonly quickLinks: FooterLink[] = [
    { label: 'About Us', path: '/about' },
    { label: 'Rooms & Suites', path: '/rooms' },
    { label: 'Amenities', path: '/amenities' },
    { label: 'Gallery', path: '/gallery' },
    { label: 'Book a Stay', path: '/booking' },
    { label: 'Contact', path: '/contact' },
  ];

  readonly socialLinks: SocialLink[] = [
    { label: 'Facebook', icon: 'fa-brands fa-facebook-f', url: 'https://facebook.com' },
    { label: 'Instagram', icon: 'fa-brands fa-instagram', url: 'https://instagram.com' },
    { label: 'X (Twitter)', icon: 'fa-brands fa-x-twitter', url: 'https://x.com' },
    { label: 'YouTube', icon: 'fa-brands fa-youtube', url: 'https://youtube.com' },
  ];

  scrollToTop(): void {
    // Goes through Lenis when smooth scrolling is active, falls back otherwise.
    this.motion.scrollTo(0);
  }
}
