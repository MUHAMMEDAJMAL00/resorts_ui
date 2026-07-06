import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  NgZone,
  OnInit,
  inject,
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { gsap } from 'gsap';

import { Room, RoomImage } from '../../core/models/room.model';
import { MotionService } from '../../core/services/motion.service';
import { RoomsService } from '../../core/services/rooms.service';

@Component({
  selector: 'app-room-detail-page',
  templateUrl: './room-detail-page.component.html',
  styleUrl: './room-detail-page.component.css',
  standalone: false,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RoomDetailPageComponent implements OnInit {
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  private readonly roomsService = inject(RoomsService);
  private readonly cdr = inject(ChangeDetectorRef);
  private readonly zone = inject(NgZone);
  private readonly host = inject<ElementRef<HTMLElement>>(ElementRef);
  private readonly motion = inject(MotionService);

  room: Room | null = null;
  activeImage: RoomImage | null = null;

  ngOnInit(): void {
    // Support navigating between rooms while staying on this page.
    this.route.paramMap.subscribe((params) => {
      const room = this.roomsService.getRoomById(params.get('id') ?? '');
      if (!room) {
        this.router.navigate(['/rooms']);
        return;
      }
      this.room = room;
      this.activeImage = room.images[0];
      this.cdr.markForCheck();
    });
  }

  selectImage(image: RoomImage): void {
    if (image === this.activeImage) {
      return;
    }
    this.activeImage = image;
    this.cdr.markForCheck();
    if (this.motion.reduced) {
      return;
    }
    // Soft crossfade when the main photo swaps.
    this.zone.runOutsideAngular(() => {
      const main = this.host.nativeElement.querySelector('.room-detail__main-img');
      if (main) {
        gsap.fromTo(
          main,
          { autoAlpha: 0.35, scale: 1.02 },
          { autoAlpha: 1, scale: 1, duration: 0.5, ease: 'power2.out' },
        );
      }
    });
  }
}
