import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';
import { BookingConfirmation, BookingRequest, BookingStatus } from '../models/booking.model';

@Injectable({ providedIn: 'root' })
export class BookingService {
  /**
   * Simulates submitting a booking to a backend.
   * Replace with a real HttpClient call when an API is available.
   */
  submitBooking(request: BookingRequest): Observable<BookingConfirmation> {
    const reference =
      'WYD-' + Math.abs(this.hash(request.email + request.checkIn)).toString(36).toUpperCase().slice(0, 6);
    return of({ reference, status: BookingStatus.Pending }).pipe(delay(800));
  }

  private hash(value: string): number {
    let h = 0;
    for (let i = 0; i < value.length; i++) {
      h = (h << 5) - h + value.charCodeAt(i);
      h |= 0;
    }
    return h;
  }
}
