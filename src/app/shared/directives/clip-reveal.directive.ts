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
 * Scroll-triggered clip-path "wipe" reveal for images — the mask slides away
 * while the image settles from a slight zoom, instead of a plain opacity fade.
 *
 *   <img appClipReveal />
 *   <figure appClipReveal clipFrom="bottom" [clipDelay]="0.15">…</figure>
 */
@Directive({ selector: '[appClipReveal]', standalone: false })
export class ClipRevealDirective implements AfterViewInit, OnDestroy {
  /** Edge the image is revealed from. */
  @Input() clipFrom: 'left' | 'right' | 'bottom' = 'left';
  /** Extra delay (s) — for staggering items in a grid. */
  @Input() clipDelay = 0;

  private readonly el = inject<ElementRef<HTMLElement>>(ElementRef);
  private readonly zone = inject(NgZone);
  private readonly motion = inject(MotionService);
  private ctx: gsap.Context | null = null;

  ngAfterViewInit(): void {
    if (this.motion.reduced) {
      return;
    }
    const start: Record<typeof this.clipFrom, string> = {
      left: 'inset(0 100% 0 0)',
      right: 'inset(0 0 0 100%)',
      bottom: 'inset(100% 0 0 0)',
    };
    this.zone.runOutsideAngular(() => {
      const host = this.el.nativeElement;
      this.ctx = gsap.context(() => {
        gsap.fromTo(
          host,
          { clipPath: start[this.clipFrom], scale: 1.06 },
          {
            clipPath: 'inset(0% 0% 0% 0%)',
            scale: 1,
            duration: 1.15,
            ease: 'power3.inOut',
            delay: this.clipDelay,
            // Only clear the clip — scale settles at 1 and must not wipe a
            // parallax transform running on the same element.
            clearProps: 'clipPath',
            scrollTrigger: {
              trigger: host,
              start: 'top 82%',
              once: true,
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
