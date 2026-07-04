import { ChangeDetectionStrategy, Component } from '@angular/core';

interface FeatureItem {
  icon: string;
  title: string;
  text: string;
}

@Component({
  selector: 'app-about-preview',
  templateUrl: './about-preview.component.html',
  styleUrl: './about-preview.component.css',
  standalone: false,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AboutPreviewComponent {
  readonly features: FeatureItem[] = [
    {
      icon: 'fa-solid fa-umbrella-beach',
      title: 'Private Beachfront',
      text: '400 metres of white sand reserved for our guests alone.',
    },
    {
      icon: 'fa-solid fa-utensils',
      title: 'Three Restaurants',
      text: 'From barefoot beach grill to a chef’s tasting menu.',
    },
    {
      icon: 'fa-solid fa-spa',
      title: 'Ocean-View Spa',
      text: 'Treatments that open to the sound of the sea.',
    },
    {
      icon: 'fa-solid fa-water-ladder',
      title: 'Infinity Pool',
      text: 'A horizon-edge pool warmed to the evening air.',
    },
    {
      icon: 'fa-solid fa-bell-concierge',
      title: 'Personal Service',
      text: 'A concierge team on call around the clock.',
    },
  ];
}
