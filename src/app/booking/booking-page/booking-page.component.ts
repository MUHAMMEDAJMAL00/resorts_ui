import { ChangeDetectorRef, Component, OnInit, inject } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  ValidationErrors,
  Validators,
} from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

import { BookingConfirmation, BookingRequest } from '../../core/models/booking.model';
import { Room } from '../../core/models/room.model';
import { BookingService } from '../../core/services/booking.service';
import { RoomsService } from '../../core/services/rooms.service';
import { WhatsappService } from '../../core/services/whatsapp.service';

const MS_PER_DAY = 86_400_000;

function dateRangeValidator(group: AbstractControl): ValidationErrors | null {
  const checkIn = group.get('checkIn')?.value as string;
  const checkOut = group.get('checkOut')?.value as string;
  if (!checkIn || !checkOut) {
    return null;
  }
  // ISO date strings (yyyy-mm-dd) compare correctly as strings
  return checkOut > checkIn ? null : { dateRange: true };
}

@Component({
  selector: 'app-booking-page',
  templateUrl: './booking-page.component.html',
  styleUrl: './booking-page.component.css',
  standalone: false,
})
export class BookingPageComponent implements OnInit {
  private readonly fb = inject(FormBuilder);

  readonly rooms: Room[];
  readonly guestOptions = [1, 2, 3, 4, 5, 6];
  readonly today = new Date().toISOString().split('T')[0];

  submitting = false;
  submitted = false;
  confirmation: BookingConfirmation | null = null;

  readonly form = this.fb.nonNullable.group(
    {
      roomId: ['', Validators.required],
      checkIn: ['', Validators.required],
      checkOut: ['', Validators.required],
      guests: [2, [Validators.required, Validators.min(1), Validators.max(6)]],
      fullName: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required, Validators.pattern(/^[0-9+\-\s()]{7,17}$/)]],
      specialRequests: [''],
    },
    { validators: dateRangeValidator },
  );

  constructor(
    private readonly roomsService: RoomsService,
    private readonly bookingService: BookingService,
    private readonly whatsapp: WhatsappService,
    private readonly route: ActivatedRoute,
    private readonly cdr: ChangeDetectorRef,
  ) {
    this.rooms = roomsService.getRooms();
  }

  ngOnInit(): void {
    // Pre-select a room when arriving from a room card ("/booking?room=id")
    const roomId = this.route.snapshot.queryParamMap.get('room');
    if (roomId && this.roomsService.getRoomById(roomId)) {
      this.form.patchValue({ roomId });
    }
  }

  get selectedRoom(): Room | undefined {
    return this.roomsService.getRoomById(this.form.getRawValue().roomId);
  }

  get nights(): number {
    const { checkIn, checkOut } = this.form.getRawValue();
    if (!checkIn || !checkOut) {
      return 0;
    }
    const ms = new Date(checkOut).getTime() - new Date(checkIn).getTime();
    return ms > 0 ? Math.round(ms / MS_PER_DAY) : 0;
  }

  get total(): number {
    const room = this.selectedRoom;
    return room && this.nights > 0 ? room.pricePerNight * this.nights : 0;
  }

  hasError(controlName: string): boolean {
    const control = this.form.get(controlName);
    return !!control && control.invalid && (control.touched || this.submitted);
  }

  get hasDateRangeError(): boolean {
    return (
      this.form.hasError('dateRange') &&
      (this.form.controls.checkOut.touched || this.submitted)
    );
  }

  onSubmit(): void {
    this.submitted = true;
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const request: BookingRequest = this.form.getRawValue();
    // Open WhatsApp synchronously (before the simulated call) so the popup
    // isn't blocked by the browser.
    this.whatsapp.send(this.buildWhatsappMessage(request));
    this.submitting = true;
    this.bookingService.submitBooking(request).subscribe((confirmation) => {
      this.confirmation = confirmation;
      this.submitting = false;
      // The delayed emission doesn't trigger change detection on its own
      // (same quirk the hero slider works around), so schedule it explicitly.
      this.cdr.markForCheck();
    });
  }

  private buildWhatsappMessage(request: BookingRequest): string {
    const lines = [
      '*Booking Enquiry — Wayanad Resorts*',
      `Room: ${this.selectedRoom?.name ?? request.roomId}`,
      `Check-in: ${request.checkIn} | Check-out: ${request.checkOut} (${this.nights} night${this.nights === 1 ? '' : 's'})`,
      `Guests: ${request.guests}`,
      `Name: ${request.fullName}`,
      `Email: ${request.email}`,
      `Phone: ${request.phone}`,
    ];
    if (request.specialRequests.trim()) {
      lines.push(`Special requests: ${request.specialRequests.trim()}`);
    }
    if (this.total > 0) {
      lines.push(`Estimated total: $${this.total}`);
    }
    return lines.join('\n');
  }

  startNewBooking(): void {
    this.confirmation = null;
    this.submitted = false;
    this.form.reset({ guests: 2 });
  }
}
