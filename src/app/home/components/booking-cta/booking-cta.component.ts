import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-booking-cta',
  templateUrl: './booking-cta.component.html',
  styleUrl: './booking-cta.component.css',
  standalone: false,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BookingCtaComponent {}
