export enum BookingStatus {
  Pending = 'PENDING',
  Confirmed = 'CONFIRMED',
  Cancelled = 'CANCELLED',
}

export interface BookingRequest {
  roomId: string;
  checkIn: string;
  checkOut: string;
  guests: number;
  fullName: string;
  email: string;
  phone: string;
  specialRequests: string;
}

export interface BookingConfirmation {
  reference: string;
  status: BookingStatus;
}
