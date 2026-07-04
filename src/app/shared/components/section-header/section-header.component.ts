import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
  selector: 'app-section-header',
  templateUrl: './section-header.component.html',
  styleUrl: './section-header.component.css',
  standalone: false,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SectionHeaderComponent {
  @Input({ required: true }) title = '';
  @Input() eyebrow = '';
  @Input() subtitle = '';
  @Input() align: 'center' | 'left' = 'center';
}
