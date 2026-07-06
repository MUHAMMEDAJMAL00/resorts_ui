import {
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  NgZone,
  OnDestroy,
  OnInit,
} from '@angular/core';

import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import { MotionService } from '../../../core/services/motion.service';
import { splitWords } from '../../../shared/animations/split-words';

gsap.registerPlugin(ScrollTrigger);

interface HeroSlide {
  src: string;
  alt: string;
  eyebrow: string;
  title: string;
  subtitle: string;
}

const SLIDE_INTERVAL_MS = 5000;

@Component({
  selector: 'app-hero-slider',
  templateUrl: './hero-slider.component.html',
  styleUrl: './hero-slider.component.css',
  standalone: false,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeroSliderComponent implements OnInit, AfterViewInit, OnDestroy {
  currentIndex = 0;

  readonly slides: HeroSlide[] = [
    // Photos downloaded from Unsplash into assets (no runtime hotlinking)
    {
      src: 'assets/images/hero/hero-wayanad-luxury-resort.jpg',
      alt: 'Luxury Wayanad resort with infinity pool overlooking lush green tropical valley',
      eyebrow: 'Wayanad Resorts',
      title: 'Where Happy Stays Begin',
      subtitle:
        'Comfortable rooms, warm hospitality and easygoing days — a resort made for slow mornings, good food and even better memories.',
    },
    {
      src: 'assets/images/hero/hero-misty-valley-river.jpg',
      alt: 'Misty river valley at sunrise with pine forests and towering cliffs',
      eyebrow: 'Misty Mornings',
      title: 'Wake Up Above the Clouds',
      subtitle:
        'Sunrise over the valley, coffee on your balcony and mist rolling through the pines — mornings here are worth setting an alarm for.',
    },
    {
      src: 'assets/images/hero/hero-lodge-sunset-pool.jpg',
      alt: 'Warmly lit wooden resort lodge with poolside loungers at sunset',
      eyebrow: 'Golden Evenings',
      title: 'Sunsets Worth Slowing Down For',
      subtitle:
        'As the light turns gold, the pool glows, dinner is served under the palms and the day finds its unhurried ending.',
    },
    {
      src: 'assets/images/hero/hero-wayanad-hills.jpg',
      alt: 'Velvety green rolling hills of the Western Ghats stretching to the horizon',
      eyebrow: 'The Western Ghats',
      title: 'Lose Yourself in Endless Green',
      subtitle:
        'Rolling hills, tea gardens and forest trails start minutes from your door — Wayanad’s wild side is yours to wander.',
    },
  ];

  private timer: ReturnType<typeof setInterval> | null = null;
  private gsapContext: gsap.Context | null = null;
  private contentTimeline: gsap.core.Timeline | null = null;

  constructor(
    private readonly cdr: ChangeDetectorRef,
    private readonly zone: NgZone,
    private readonly host: ElementRef<HTMLElement>,
    private readonly motion: MotionService,
  ) {}

  ngOnInit(): void {
    this.startTimer();
  }

  ngAfterViewInit(): void {
    if (this.motion.reduced) {
      return;
    }
    this.zone.runOutsideAngular(() => this.playIntro());
  }

  ngOnDestroy(): void {
    this.stopTimer();
    this.contentTimeline?.kill();
    this.gsapContext?.revert();
  }

  next(): void {
    this.goTo((this.currentIndex + 1) % this.slides.length);
  }

  previous(): void {
    this.goTo((this.currentIndex - 1 + this.slides.length) % this.slides.length);
  }

  goTo(index: number): void {
    if (index === this.currentIndex) {
      return;
    }
    this.currentIndex = index;
    this.cdr.markForCheck();
    this.zone.runOutsideAngular(() => this.transitionContent(this.slides[index]));
    this.restartTimer();
  }

  /**
   * Page-load intro: panel settles in, heading reveals word by word from a
   * line mask, then subtitle, actions and slider controls follow. Also sets
   * up the scroll parallax (background drifts slower than the foreground).
   */
  private playIntro(): void {
    const host = this.host.nativeElement;
    const panel = host.querySelector<HTMLElement>('.hero__panel');
    const heading = panel?.querySelector('h1');
    if (!panel || !heading) {
      return;
    }
    splitWords(heading, 'hero-word');

    this.gsapContext = gsap.context(() => {
      gsap
        .timeline({ delay: 0.15, defaults: { ease: 'power3.out', duration: 0.6 } })
        .from(panel, { autoAlpha: 0, scale: 0.97, duration: 0.5 })
        .from(panel.querySelector('.eyebrow--hero'), { autoAlpha: 0, y: 24 }, '-=0.25')
        .from(
          panel.querySelectorAll('.hero-word__inner'),
          { yPercent: 115, duration: 0.6, stagger: 0.05 },
          '-=0.35',
        )
        .from(panel.querySelector('p'), { autoAlpha: 0, y: 20 }, '-=0.35')
        .from(
          panel.querySelectorAll('.hero__actions a'),
          { autoAlpha: 0, y: 16, duration: 0.5, stagger: 0.08 },
          '-=0.4',
        )
        .from(
          host.querySelectorAll('.hero__arrow, .hero__dots'),
          { autoAlpha: 0, duration: 0.4, stagger: 0.06, clearProps: 'all' },
          '-=0.3',
        );

      gsap.to(host.querySelector('.hero__slides'), {
        yPercent: 18,
        ease: 'none',
        scrollTrigger: {
          trigger: host,
          start: 'top top',
          end: 'bottom top',
          scrub: true,
        },
      });
    }, host);
  }

  /**
   * Swap the panel copy to the given slide's content: the old text dips out,
   * the new heading rises in word by word. The text lives outside Angular's
   * bindings on purpose — the word masks rebuild the heading's DOM each time.
   */
  private transitionContent(slide: HeroSlide): void {
    const panel = this.host.nativeElement.querySelector<HTMLElement>('.hero__panel');
    const eyebrow = panel?.querySelector<HTMLElement>('.eyebrow--hero');
    const heading = panel?.querySelector<HTMLElement>('h1');
    const subtitle = panel?.querySelector<HTMLElement>('p');
    if (!panel || !eyebrow || !heading || !subtitle) {
      return;
    }

    const applyContent = () => {
      eyebrow.textContent = slide.eyebrow;
      heading.textContent = slide.title;
      splitWords(heading, 'hero-word');
      subtitle.textContent = slide.subtitle;
    };

    if (this.motion.reduced) {
      applyContent();
      return;
    }

    this.contentTimeline?.kill();
    this.contentTimeline = gsap
      .timeline({ defaults: { ease: 'power2.in' } })
      .to([eyebrow, heading, subtitle], {
        autoAlpha: 0,
        y: -14,
        duration: 0.2,
        stagger: 0.03,
      })
      .add(applyContent)
      .set([eyebrow, heading, subtitle], { autoAlpha: 1, y: 0 })
      .set([eyebrow, subtitle], { autoAlpha: 0, y: 18 })
      .fromTo(
        heading.querySelectorAll('.hero-word__inner'),
        { yPercent: 115 },
        { yPercent: 0, duration: 0.5, ease: 'power3.out', stagger: 0.04 },
      )
      .to(
        eyebrow,
        { autoAlpha: 1, y: 0, duration: 0.4, ease: 'power3.out' },
        '-=0.45',
      )
      .to(
        subtitle,
        { autoAlpha: 1, y: 0, duration: 0.4, ease: 'power3.out' },
        '-=0.3',
      );
  }

  private startTimer(): void {
    // Run the interval outside Angular so it doesn't trigger app-wide
    // change detection every 5s; re-enter the zone only to update the slide.
    this.zone.runOutsideAngular(() => {
      this.timer = setInterval(() => {
        const index = (this.currentIndex + 1) % this.slides.length;
        this.zone.run(() => {
          this.currentIndex = index;
          this.cdr.markForCheck();
        });
        this.transitionContent(this.slides[index]);
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
