import {
  AfterViewInit,
  Directive,
  ElementRef,
  NgZone,
  OnDestroy,
  inject,
} from '@angular/core';

import { gsap } from 'gsap';

import { MotionService } from '../../core/services/motion.service';

/**
 * Subtle "magnetic" hover — the element leans a few pixels toward the cursor
 * and springs back on leave. Only active on devices that actually hover.
 *
 *   <a appMagnetic class="btn-resort …">Book Now</a>
 */
@Directive({ selector: '[appMagnetic]', standalone: false })
export class MagneticDirective implements AfterViewInit, OnDestroy {
  /** Fraction of the cursor's offset from center that the element follows. */
  private static readonly PULL = 0.25;
  private static readonly MAX_SHIFT = 10;

  private readonly el = inject<ElementRef<HTMLElement>>(ElementRef);
  private readonly zone = inject(NgZone);
  private readonly motion = inject(MotionService);

  private cleanup: (() => void) | null = null;

  ngAfterViewInit(): void {
    if (this.motion.reduced || !window.matchMedia('(hover: hover)').matches) {
      return;
    }
    this.zone.runOutsideAngular(() => {
      const host = this.el.nativeElement;
      const xTo = gsap.quickTo(host, 'x', { duration: 0.4, ease: 'power3.out' });
      const yTo = gsap.quickTo(host, 'y', { duration: 0.4, ease: 'power3.out' });

      const clamp = gsap.utils.clamp(
        -MagneticDirective.MAX_SHIFT,
        MagneticDirective.MAX_SHIFT,
      );

      const onMove = (e: MouseEvent) => {
        const rect = host.getBoundingClientRect();
        const dx = e.clientX - (rect.left + rect.width / 2);
        const dy = e.clientY - (rect.top + rect.height / 2);
        xTo(clamp(dx * MagneticDirective.PULL));
        yTo(clamp(dy * MagneticDirective.PULL));
      };
      const onLeave = () => {
        gsap.to(host, { x: 0, y: 0, duration: 0.6, ease: 'elastic.out(1, 0.4)' });
      };

      host.addEventListener('mousemove', onMove, { passive: true });
      host.addEventListener('mouseleave', onLeave, { passive: true });
      this.cleanup = () => {
        host.removeEventListener('mousemove', onMove);
        host.removeEventListener('mouseleave', onLeave);
        gsap.killTweensOf(host);
      };
    });
  }

  ngOnDestroy(): void {
    this.cleanup?.();
  }
}
