import { ChangeDetectionStrategy, Component } from '@angular/core';

interface ResortValue {
  icon: string;
  title: string;
  text: string;
}

@Component({
  selector: 'app-about-page',
  templateUrl: './about-page.component.html',
  styleUrl: './about-page.component.css',
  standalone: false,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AboutPageComponent {
  readonly values: ResortValue[] = [
    {
      icon: 'fa-solid fa-heart',
      title: 'Genuine Hospitality',
      text: 'Service that anticipates rather than reacts — our team remembers your preferences from the first morning.',
    },
    {
      icon: 'fa-solid fa-leaf',
      title: 'Gentle Footprint',
      text: 'Solar-heated pools, a plastic-free shoreline and produce grown in our own gardens.',
    },
    {
      icon: 'fa-solid fa-gem',
      title: 'Quiet Luxury',
      text: 'No queues, no crowds — just considered details, generous space and time that feels like your own.',
    },
  ];
}
