import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  NgZone,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { Testimonial } from '../../../core/models/testimonial.model';
import { TestimonialsService } from '../../../core/services/testimonials.service';

const AUTO_ADVANCE_MS = 7000;

@Component({
  selector: 'app-testimonials',
  templateUrl: './testimonials.component.html',
  styleUrl: './testimonials.component.css',
  standalone: false,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TestimonialsComponent implements OnInit, OnDestroy {
  readonly testimonials: Testimonial[];
  activeIndex = 0;

  private timer: ReturnType<typeof setInterval> | null = null;

  constructor(
    testimonialsService: TestimonialsService,
    private readonly cdr: ChangeDetectorRef,
    private readonly zone: NgZone,
  ) {
    this.testimonials = testimonialsService.getTestimonials();
  }

  ngOnInit(): void {
    this.startTimer();
  }

  ngOnDestroy(): void {
    this.stopTimer();
  }

  next(): void {
    this.goTo((this.activeIndex + 1) % this.testimonials.length);
  }

  previous(): void {
    this.goTo((this.activeIndex - 1 + this.testimonials.length) % this.testimonials.length);
  }

  goTo(index: number): void {
    this.activeIndex = index;
    this.cdr.markForCheck();
    this.stopTimer();
    this.startTimer();
  }

  pause(): void {
    this.stopTimer();
  }

  resume(): void {
    if (this.timer === null) {
      this.startTimer();
    }
  }

  private startTimer(): void {
    this.zone.runOutsideAngular(() => {
      this.timer = setInterval(() => {
        this.zone.run(() => {
          this.activeIndex = (this.activeIndex + 1) % this.testimonials.length;
          this.cdr.markForCheck();
        });
      }, AUTO_ADVANCE_MS);
    });
  }

  private stopTimer(): void {
    if (this.timer !== null) {
      clearInterval(this.timer);
      this.timer = null;
    }
  }
}
