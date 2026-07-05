import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
  selector: 'app-page-banner',
  templateUrl: './page-banner.component.html',
  styleUrl: './page-banner.component.css',
  standalone: false,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PageBannerComponent {
  @Input({ required: true }) title = '';
  @Input() eyebrow = '';
  @Input() subtitle = '';
  /** Optional background photo, blended under the navy/ocean gradient. */
  @Input() image = '';
}
