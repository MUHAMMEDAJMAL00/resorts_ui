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
 * Scroll-triggered "fade + rise" reveal.
 *
 *   <section appReveal>…</section>                      — reveal the host
 *   <div appReveal revealChildren=".card" …>            — stagger its children
 *
 * Animates transform/opacity only, fires once, and is skipped entirely for
 * prefers-reduced-motion users (content simply stays visible).
 */
@Directive({ selector: '[appReveal]', standalone: false })
export class RevealDirective implements AfterViewInit, OnDestroy {
  /** Rise distance in px. */
  @Input() revealY = 36;
  /** Extra delay (s) after the trigger fires. */
  @Input() revealDelay = 0;
  /** Starting scale (e.g. 0.95 for cards). 1 = no scaling. */
  @Input() revealScale = 1;
  /** CSS selector — when set, children matching it stagger in instead of the host. */
  @Input() revealChildren = '';
  /** Gap (s) between staggered children. */
  @Input() revealStagger = 0.12;

  private readonly el = inject<ElementRef<HTMLElement>>(ElementRef);
  private readonly zone = inject(NgZone);
  private readonly motion = inject(MotionService);
  private ctx: gsap.Context | null = null;

  ngAfterViewInit(): void {
    if (this.motion.reduced) {
      return;
    }
    this.zone.runOutsideAngular(() => {
      const host = this.el.nativeElement;
      const targets = this.revealChildren
        ? Array.from(host.querySelectorAll<HTMLElement>(this.revealChildren))
        : [host];
      if (!targets.length) {
        return;
      }
      this.ctx = gsap.context(() => {
        gsap.from(targets, {
          autoAlpha: 0,
          y: this.revealY,
          scale: this.revealScale,
          duration: 0.9,
          ease: 'power3.out',
          delay: this.revealDelay,
          stagger: this.revealStagger,
          clearProps: 'transform,opacity,visibility',
          scrollTrigger: {
            trigger: host,
            start: 'top 80%',
            once: true,
          },
        });
      });
    });
  }

  ngOnDestroy(): void {
    this.ctx?.revert();
  }
}
