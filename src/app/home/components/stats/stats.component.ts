import {
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  NgZone,
  OnDestroy,
} from '@angular/core';

interface StatItem {
  icon: string;
  target: number;
  suffix: string;
  label: string;
}

const COUNT_DURATION_MS = 1600;

@Component({
  selector: 'app-stats',
  templateUrl: './stats.component.html',
  styleUrl: './stats.component.css',
  standalone: false,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StatsComponent implements AfterViewInit, OnDestroy {
  readonly stats: StatItem[] = [
    { icon: 'fa-solid fa-bed', target: 120, suffix: '+', label: 'Rooms & Suites' },
    { icon: 'fa-solid fa-face-smile', target: 25, suffix: 'k+', label: 'Happy Guests' },
    { icon: 'fa-solid fa-calendar-days', target: 18, suffix: '', label: 'Years of Excellence' },
    { icon: 'fa-solid fa-award', target: 12, suffix: '', label: 'International Awards' },
  ];

  displayValues: number[] = this.stats.map(() => 0);

  private observer: IntersectionObserver | null = null;
  private animationFrame: number | null = null;
  private hasAnimated = false;

  constructor(
    private readonly host: ElementRef<HTMLElement>,
    private readonly cdr: ChangeDetectorRef,
    private readonly zone: NgZone,
  ) {}

  ngAfterViewInit(): void {
    // Trigger the count-up exactly once, when the section scrolls into view.
    this.zone.runOutsideAngular(() => {
      this.observer = new IntersectionObserver(
        (entries) => {
          if (entries.some((entry) => entry.isIntersecting) && !this.hasAnimated) {
            this.hasAnimated = true;
            this.observer?.disconnect();
            this.animate();
          }
        },
        { threshold: 0.3 },
      );
      this.observer.observe(this.host.nativeElement);
    });
  }

  ngOnDestroy(): void {
    this.observer?.disconnect();
    if (this.animationFrame !== null) {
      cancelAnimationFrame(this.animationFrame);
    }
  }

  private animate(): void {
    const start = performance.now();

    const step = (now: number) => {
      const t = Math.min((now - start) / COUNT_DURATION_MS, 1);
      const eased = 1 - Math.pow(1 - t, 3);
      this.zone.run(() => {
        this.displayValues = this.stats.map((stat) => Math.round(stat.target * eased));
        this.cdr.markForCheck();
      });
      if (t < 1) {
        this.animationFrame = requestAnimationFrame(step);
      }
    };

    this.animationFrame = requestAnimationFrame(step);
  }
}
