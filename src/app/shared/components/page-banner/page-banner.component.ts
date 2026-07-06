import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  Input,
  NgZone,
  OnDestroy,
  inject,
} from '@angular/core';

import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import { MotionService } from '../../../core/services/motion.service';
import { splitWords } from '../../animations/split-words';

gsap.registerPlugin(ScrollTrigger);

@Component({
  selector: 'app-page-banner',
  templateUrl: './page-banner.component.html',
  styleUrl: './page-banner.component.css',
  standalone: false,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PageBannerComponent implements AfterViewInit, OnDestroy {
  @Input({ required: true }) title = '';
  @Input() eyebrow = '';
  @Input() subtitle = '';
  /** Optional background photo, blended under the navy/ocean gradient. */
  @Input() image = '';

  private readonly el = inject<ElementRef<HTMLElement>>(ElementRef);
  private readonly zone = inject(NgZone);
  private readonly motion = inject(MotionService);
  private ctx: gsap.Context | null = null;

  ngAfterViewInit(): void {
    if (this.motion.reduced) {
      return;
    }
    this.zone.runOutsideAngular(() => this.playIntro());
  }

  ngOnDestroy(): void {
    this.ctx?.revert();
  }

  /**
   * Premium page-entrance: the photo settles from a slow zoom while the
   * scrim melts in, then the eyebrow rises, the title reveals word by word
   * from line masks and the subtitle follows. On scroll the photo drifts
   * slower than the page (parallax) and the copy lifts away.
   */
  private playIntro(): void {
    const host = this.el.nativeElement;
    const banner = host.querySelector<HTMLElement>('.page-banner');
    const heading = banner?.querySelector('h1');
    if (!banner || !heading) {
      return;
    }
    splitWords(heading, 'banner-word');

    const image = banner.querySelector('.page-banner__image');
    const scrim = banner.querySelector('.page-banner__scrim');
    const eyebrow = banner.querySelector('.eyebrow--banner');
    const subtitle = banner.querySelector('p');

    this.ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });
      if (image) {
        // Settle to 1.1 (not 1) so the scroll parallax below never exposes
        // the banner edges while the photo drifts.
        tl.fromTo(
          image,
          { scale: 1.22, autoAlpha: 0 },
          { scale: 1.1, autoAlpha: 1, duration: 1.5, ease: 'power2.out' },
          0,
        );
      }
      if (scrim) {
        tl.from(scrim, { autoAlpha: 0, duration: 0.9, ease: 'power1.out' }, 0);
      }
      if (eyebrow) {
        tl.from(eyebrow, { autoAlpha: 0, y: 22, duration: 0.7 }, 0.2);
      }
      tl.from(
        banner.querySelectorAll('.banner-word__inner'),
        { yPercent: 115, duration: 0.85, stagger: 0.06 },
        0.3,
      );
      if (subtitle) {
        tl.from(subtitle, { autoAlpha: 0, y: 18, duration: 0.7 }, 0.62);
      }

      // Scroll-out parallax: photo drifts slower, copy lifts and fades.
      if (image) {
        gsap.to(image, {
          yPercent: 5,
          ease: 'none',
          scrollTrigger: { trigger: banner, start: 'top top', end: 'bottom top', scrub: true },
        });
      }
      gsap.to(banner.querySelector('.container'), {
        yPercent: -20,
        autoAlpha: 0.3,
        ease: 'none',
        scrollTrigger: { trigger: banner, start: 'top top', end: 'bottom top', scrub: true },
      });
    }, host);
  }
}
