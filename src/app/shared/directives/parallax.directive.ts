import {
  AfterViewInit,
  Directive,
  ElementRef,
  Input,
  NgZone,
  OnDestroy,
  inject,
} from '@angular/core';

import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import { MotionService } from '../../core/services/motion.service';

gsap.registerPlugin(ScrollTrigger);

/**
 * Gentle scroll parallax: the element drifts between +N% and -N% of its own
 * height while it crosses the viewport (scrubbed, transform-only).
 *
 *   <img [appParallax]="8" />      — drifts 8% against the scroll
 *   <div [appParallax]="-6">…</div> — negative = drifts with the scroll
 */
@Directive({ selector: '[appParallax]', standalone: false })
export class ParallaxDirective implements AfterViewInit, OnDestroy {
  /** Drift amount as yPercent; positive moves against scroll direction. */
  @Input() appParallax = 8;

  private readonly el = inject<ElementRef<HTMLElement>>(ElementRef);
  private readonly zone = inject(NgZone);
  private readonly motion = inject(MotionService);
  private ctx: gsap.Context | null = null;

  ngAfterViewInit(): void {
    if (this.motion.reduced || !this.appParallax) {
      return;
    }
    this.zone.runOutsideAngular(() => {
      const host = this.el.nativeElement;
      this.ctx = gsap.context(() => {
        gsap.fromTo(
          host,
          { yPercent: this.appParallax },
          {
            yPercent: -this.appParallax,
            ease: 'none',
            scrollTrigger: {
              trigger: host,
              start: 'top bottom',
              end: 'bottom top',
              scrub: true,
            },
          },
        );
      });
    });
  }

  ngOnDestroy(): void {
    this.ctx?.revert();
  }
}
