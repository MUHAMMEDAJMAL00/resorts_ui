import {
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  Input,
  NgZone,
  OnDestroy,
  ViewChild,
} from '@angular/core';

import { Room } from '../../../core/models/room.model';

/** Drag distance (px) beyond which a pointer gesture counts as a swipe. */
const SWIPE_THRESHOLD = 50;
/** Drag distance (px) beyond which the click-through to the detail page is cancelled. */
const CLICK_TOLERANCE = 8;
/** How much the track follows the finger past the first/last photo. */
const EDGE_RESISTANCE = 0.3;

@Component({
  selector: 'app-room-card',
  templateUrl: './room-card.component.html',
  styleUrl: './room-card.component.css',
  standalone: false,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RoomCardComponent implements AfterViewInit, OnDestroy {
  @Input({ required: true }) room!: Room;

  @ViewChild('media') private mediaRef!: ElementRef<HTMLElement>;
  @ViewChild('track') private trackRef!: ElementRef<HTMLElement>;

  activeIndex = 0;

  private suppressClick = false;
  private removeListeners: (() => void) | null = null;

  constructor(
    private readonly cdr: ChangeDetectorRef,
    private readonly zone: NgZone,
  ) {}

  ngAfterViewInit(): void {
    // Pointer handling runs outside Angular — dragging fires dozens of
    // events per second and none of them need change detection.
    this.zone.runOutsideAngular(() => this.enableSwipe());
  }

  ngOnDestroy(): void {
    this.removeListeners?.();
  }

  get isFirst(): boolean {
    return this.activeIndex === 0;
  }

  get isLast(): boolean {
    return this.activeIndex === this.room.images.length - 1;
  }

  next(): void {
    if (!this.isLast) {
      this.goTo(this.activeIndex + 1);
    }
  }

  previous(): void {
    if (!this.isFirst) {
      this.goTo(this.activeIndex - 1);
    }
  }

  goTo(index: number): void {
    this.activeIndex = index;
    this.settleTrack();
    this.cdr.markForCheck();
  }

  /** Swallow the navigation when the "click" was actually a drag. */
  onLinkClick(event: MouseEvent): void {
    if (this.suppressClick) {
      event.preventDefault();
      event.stopPropagation();
    }
  }

  private settleTrack(): void {
    const track = this.trackRef?.nativeElement;
    if (track) {
      track.style.transform = `translateX(${-this.activeIndex * 100}%)`;
    }
  }

  private enableSwipe(): void {
    const media = this.mediaRef?.nativeElement;
    const track = this.trackRef?.nativeElement;
    if (!media || !track) {
      return;
    }

    let startX = 0;
    let delta = 0;
    let width = 1;
    let dragging = false;
    let captured = false;
    let pointerId = -1;

    const onDown = (e: PointerEvent) => {
      // Leave the arrows and dots alone — capturing their pointer would
      // steal the click they are about to receive.
      if (!e.isPrimary || (e.target as HTMLElement).closest('.room-card__nav, .room-card__dot')) {
        return;
      }
      dragging = true;
      captured = false;
      startX = e.clientX;
      delta = 0;
      width = media.offsetWidth || 1;
      pointerId = e.pointerId;
      track.style.transition = 'none';
    };

    const onMove = (e: PointerEvent) => {
      if (!dragging) {
        return;
      }
      delta = e.clientX - startX;
      // Capture only once it's clearly a drag — capturing on pointerdown
      // would retarget the click and break plain click-through to the
      // detail page.
      if (!captured && Math.abs(delta) > CLICK_TOLERANCE) {
        captured = true;
        this.suppressClick = true;
        try {
          media.setPointerCapture(pointerId);
        } catch {
          /* pointer may already be gone */
        }
      }
      if (!captured) {
        return;
      }
      // Rubber-band when pulling past the first or last photo.
      if ((this.isFirst && delta > 0) || (this.isLast && delta < 0)) {
        delta *= EDGE_RESISTANCE;
      }
      track.style.transform = `translateX(calc(${-this.activeIndex * 100}% + ${delta}px))`;
    };

    const onUp = () => {
      if (!dragging) {
        return;
      }
      dragging = false;
      track.style.transition = '';
      const threshold = Math.min(SWIPE_THRESHOLD, width * 0.15);
      if (delta <= -threshold && !this.isLast) {
        this.zone.run(() => this.next());
      } else if (delta >= threshold && !this.isFirst) {
        this.zone.run(() => this.previous());
      } else {
        this.settleTrack();
      }
      // The click event lands right after pointerup — let it be swallowed
      // first, then re-enable navigation.
      setTimeout(() => (this.suppressClick = false), 0);
    };

    media.addEventListener('pointerdown', onDown);
    media.addEventListener('pointermove', onMove);
    media.addEventListener('pointerup', onUp);
    media.addEventListener('pointercancel', onUp);
    this.removeListeners = () => {
      media.removeEventListener('pointerdown', onDown);
      media.removeEventListener('pointermove', onMove);
      media.removeEventListener('pointerup', onUp);
      media.removeEventListener('pointercancel', onUp);
    };
  }
}
