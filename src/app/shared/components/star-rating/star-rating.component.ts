import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
  selector: 'app-star-rating',
  templateUrl: './star-rating.component.html',
  styleUrl: './star-rating.component.css',
  standalone: false,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StarRatingComponent {
  @Input({ required: true }) rating = 0;

  readonly stars = [1, 2, 3, 4, 5];
}
