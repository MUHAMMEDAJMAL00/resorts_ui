import { Injectable, NgZone, OnDestroy, inject } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs/operators';

import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';

gsap.registerPlugin(ScrollTrigger);

/**
 * Central home for the site's motion system: Lenis smooth (inertia) scrolling
 * wired into GSAP's ScrollTrigger, plus the global reduced-motion switch that
 * every animation in the app checks before running.
 *
 * Everything runs outside the Angular zone — animations only touch the DOM,
 * so they must not trigger change detection on every frame.
 */
@Injectable({ providedIn: 'root' })
export class MotionService implements OnDestroy {
  private readonly zone = inject(NgZone);
  private readonly router = inject(Router);

  /** Users who ask for reduced motion get content with no animations. */
  readonly reduced =
    typeof window !== 'undefined' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  private lenis: Lenis | null = null;
  private tickerCallback: ((time: number) => void) | null = null;
  private initialized = false;

  /** Called once from AppComponent. Safe to call more than once. */
  init(): void {
    if (this.initialized || typeof window === 'undefined') {
      return;
    }
    this.initialized = true;

    if (!this.reduced) {
      this.zone.runOutsideAngular(() => {
        this.lenis = new Lenis({ duration: 1.1 });
        this.lenis.on('scroll', ScrollTrigger.update);
        this.tickerCallback = (time: number) => this.lenis?.raf(time * 1000);
        gsap.ticker.add(this.tickerCallback);
        // Lenis drives the frame loop; GSAP's lag smoothing would fight it.
        gsap.ticker.lagSmoothing(0);
      });
    }

    // After each navigation: jump to top and re-measure trigger positions
    // once the new page's DOM has painted.
    this.router.events
      .pipe(filter((e) => e instanceof NavigationEnd))
      .subscribe(() => {
        this.zone.runOutsideAngular(() => {
          this.lenis?.scrollTo(0, { immediate: true });
          requestAnimationFrame(() => ScrollTrigger.refresh());
        });
      });
  }

  /** Smooth-scroll helper that works with or without Lenis. */
  scrollTo(target: number | HTMLElement): void {
    if (this.lenis) {
      this.lenis.scrollTo(target);
    } else {
      const top = typeof target === 'number' ? target : target.offsetTop;
      window.scrollTo({ top, behavior: this.reduced ? 'auto' : 'smooth' });
    }
  }

  ngOnDestroy(): void {
    if (this.tickerCallback) {
      gsap.ticker.remove(this.tickerCallback);
    }
    this.lenis?.destroy();
  }
}
