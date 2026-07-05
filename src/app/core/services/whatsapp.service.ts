import { Injectable } from '@angular/core';

// Digits only, including country code (91 = India). Used in wa.me click-to-chat links.
const RESORT_WHATSAPP_NUMBER = '919847041503';

@Injectable({ providedIn: 'root' })
export class WhatsappService {
  /**
   * Opens WhatsApp (app on mobile, WhatsApp Web on desktop) with the given
   * message pre-filled in a chat to the resort's number. The visitor presses
   * Send there — a static site cannot send WhatsApp messages on its own.
   *
   * Must be called synchronously from a user gesture (e.g. the submit click),
   * otherwise popup blockers will stop the new tab.
   */
  send(text: string): void {
    const url = `https://wa.me/${RESORT_WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`;
    window.open(url, '_blank', 'noopener');
  }
}
