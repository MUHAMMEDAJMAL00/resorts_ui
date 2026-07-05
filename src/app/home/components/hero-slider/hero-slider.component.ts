import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  NgZone,
  OnDestroy,
  OnInit,
} from '@angular/core';

interface HeroSlide {
  src: string;
  alt: string;
}

const SLIDE_INTERVAL_MS = 5000;

@Component({
  selector: 'app-hero-slider',
  templateUrl: './hero-slider.component.html',
  styleUrl: './hero-slider.component.css',
  standalone: false,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeroSliderComponent implements OnInit, OnDestroy {
  currentIndex = 0;

  readonly slides: HeroSlide[] = [
    // Photos downloaded from Unsplash into assets (no runtime hotlinking)
    {
      src: 'assets/images/hero/hero-resort-pool-mountains.jpg',
      alt: 'Turquoise resort pool surrounded by palm trees and cottages beneath green mountains',
    },
    {
      src: 'assets/images/hero/hero-misty-valley-river.jpg',
      alt: 'Misty river valley at sunrise with pine forests and towering cliffs',
    },
    {
      src: 'assets/images/hero/hero-lodge-sunset-pool.jpg',
      alt: 'Warmly lit wooden resort lodge with poolside loungers at sunset',
    },
    {
      src: 'assets/images/hero/hero-heart-lake.jpg',
      alt: 'Heart-shaped lake ringed by green grasslands at Chembra Peak, Wayanad',
    },
  ];

  private timer: ReturnType<typeof setInterval> | null = null;

  constructor(
    private readonly cdr: ChangeDetectorRef,
    private readonly zone: NgZone,
  ) {}

  ngOnInit(): void {
    this.startTimer();
  }

  ngOnDestroy(): void {
    this.stopTimer();
  }

  next(): void {
    this.goTo((this.currentIndex + 1) % this.slides.length);
  }

  previous(): void {
    this.goTo((this.currentIndex - 1 + this.slides.length) % this.slides.length);
  }

  goTo(index: number): void {
    this.currentIndex = index;
    this.cdr.markForCheck();
    this.restartTimer();
  }

  private startTimer(): void {
    // Run the interval outside Angular so it doesn't trigger app-wide
    // change detection every 5s; re-enter the zone only to update the slide.
    this.zone.runOutsideAngular(() => {
      this.timer = setInterval(() => {
        this.zone.run(() => {
          this.currentIndex = (this.currentIndex + 1) % this.slides.length;
          this.cdr.markForCheck();
        });
      }, SLIDE_INTERVAL_MS);
    });
  }

  private stopTimer(): void {
    if (this.timer !== null) {
      clearInterval(this.timer);
      this.timer = null;
    }
  }

  private restartTimer(): void {
    this.stopTimer();
    this.startTimer();
  }
}
