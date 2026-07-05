import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Destination } from '../../../core/models/destination.model';

@Component({
  selector: 'app-destination-card',
  templateUrl: './destination-card.component.html',
  styleUrl: './destination-card.component.css',
  standalone: false,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DestinationCardComponent {
  @Input({ required: true }) destination!: Destination;

  activeIndex = 0;

  next(): void {
    this.activeIndex = (this.activeIndex + 1) % this.destination.images.length;
  }

  previous(): void {
    this.activeIndex =
      (this.activeIndex - 1 + this.destination.images.length) % this.destination.images.length;
  }

  goTo(index: number): void {
    this.activeIndex = index;
  }
}
