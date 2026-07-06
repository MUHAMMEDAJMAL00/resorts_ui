# WhatsApp Form Integration — How It Works & What Changed

This document explains how the booking and contact forms send their details to
WhatsApp **without any backend**, and lists every file that was created or
modified to make it work.

---

## 1. The Idea

This is a static Angular site — there is no server to receive form
submissions. Instead, we use WhatsApp's official **Click-to-Chat** deep link:

```
https://wa.me/<phone-number>?text=<url-encoded message>
```

When a visitor submits a form, the app:

1. Builds a readable text message from the form values.
2. URL-encodes it with `encodeURIComponent()`.
3. Opens the `wa.me` link in a new tab with `window.open()`.

What the visitor sees:

- **On mobile** → the WhatsApp app opens with the message pre-filled in a chat
  to the resort's number.
- **On desktop** → WhatsApp Web opens the same way.
- The visitor just presses **Send**.

> **Important limitation:** a static website can never send a WhatsApp message
> *silently* — the visitor always has to press Send themselves. Fully
> automatic sending requires the paid WhatsApp Business API plus a backend.
> For enquiry/booking forms, click-to-chat is the standard approach.

---

## 2. Files Changed — Overview

| File | Change |
|---|---|
| `src/app/core/services/whatsapp.service.ts` | **NEW** — holds the number, builds & opens the wa.me link |
| `src/app/booking/booking-page/booking-page.component.ts` | Submit now sends a booking enquiry to WhatsApp; also fixes a change-detection bug |
| `src/app/booking/booking-page/booking-page.component.html` | Success-card copy now mentions pressing Send in WhatsApp |
| `src/app/contact/contact-page/contact-page.component.ts` | Submit now sends the message to WhatsApp |
| `src/app/contact/contact-page/contact-page.component.html` | Success-banner copy now mentions pressing Send in WhatsApp |

---

## 3. The WhatsApp Service (new file)

**`src/app/core/services/whatsapp.service.ts`**

```ts
// Digits only, including country code (91 = India). Used in wa.me click-to-chat links.
const RESORT_WHATSAPP_NUMBER = '919847041503';

@Injectable({ providedIn: 'root' })
export class WhatsappService {
  send(text: string): void {
    const url = `https://wa.me/${RESORT_WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`;
    window.open(url, '_blank', 'noopener');
  }
}
```

Key points:

- **The phone number lives in exactly one place** — the
  `RESORT_WHATSAPP_NUMBER` constant. To change the receiving number, edit that
  one line. The format is digits only, **country code included, no `+`, no
  spaces** (wa.me requires this). `9847041503` became `919847041503` because
  `91` is India's country code.
- `providedIn: 'root'` means the service is a singleton — any component can
  inject it, no module registration needed.
- `'noopener'` prevents the opened tab from having access back to our page
  (standard security practice for `window.open`).

### The popup-blocker rule

`window.open()` is only allowed by browsers when it happens **synchronously
inside a user gesture** (the submit click). If you call it later — for example
inside a `setTimeout` or after an HTTP response — the popup blocker kills it.
That is why both components call `whatsapp.send(...)` *immediately* in
`onSubmit()`, before anything asynchronous happens.

---

## 4. Booking Form Changes

**`src/app/booking/booking-page/booking-page.component.ts`**

### a) Injected the service

```ts
constructor(
  private readonly roomsService: RoomsService,
  private readonly bookingService: BookingService,
  private readonly whatsapp: WhatsappService,   // ← new
  private readonly route: ActivatedRoute,
  private readonly cdr: ChangeDetectorRef,      // ← new (see 4c)
) { ... }
```

### b) `onSubmit()` now opens WhatsApp

```ts
onSubmit(): void {
  this.submitted = true;
  if (this.form.invalid) {
    this.form.markAllAsTouched();
    return;                                   // invalid form → nothing opens
  }

  const request: BookingRequest = this.form.getRawValue();
  // Open WhatsApp synchronously (before the simulated call) so the popup
  // isn't blocked by the browser.
  this.whatsapp.send(this.buildWhatsappMessage(request));
  this.submitting = true;
  this.bookingService.submitBooking(request).subscribe(...);  // unchanged flow
}
```

### c) The message builder

A private helper formats the enquiry. `*asterisks*` render as **bold** in
WhatsApp, and `\n` becomes a line break:

```
*Booking Enquiry — Wayanad Resorts*
Room: Deluxe Ocean View
Check-in: 2026-07-10 | Check-out: 2026-07-12 (2 nights)
Guests: 2
Name: Ajmal Test
Email: ajmal@example.com
Phone: 9876543210
Special requests: Late check-in please
Estimated total: $480
```

It reuses the component's existing `selectedRoom`, `nights` and `total`
getters, and skips the "Special requests" line when the field is empty.

### d) Bug fix: the success card never appeared (pre-existing)

While verifying, we found that **even before this feature**, submitting the
booking form left the button stuck on "Sending…" forever. The mock
`BookingService` responds after an 800 ms delay, and that delayed response
updated the component's fields but never triggered Angular change detection —
so the screen never re-rendered.

The fix is the same pattern the hero slider already uses:

```ts
this.bookingService.submitBooking(request).subscribe((confirmation) => {
  this.confirmation = confirmation;
  this.submitting = false;
  this.cdr.markForCheck();   // ← tells Angular to re-render this view
});
```

**`booking-page.component.html`** — the success card's copy was updated so the
visitor knows to complete the handoff:

> Your enquiry has been opened in WhatsApp — press **Send** there to deliver
> it to our reservations team. …

---

## 5. Contact Form Changes

**`src/app/contact/contact-page/contact-page.component.ts`**

Injected the service with the `inject()` function (matching that component's
existing style) and updated `onSubmit()`:

```ts
private readonly whatsapp = inject(WhatsappService);

onSubmit(): void {
  this.submitted = true;
  if (this.form.invalid) {
    this.form.markAllAsTouched();
    return;
  }
  // No backend — hand the message off to WhatsApp (visitor presses Send there).
  const { name, phone, email, message } = this.form.getRawValue();
  this.whatsapp.send(
    [
      '*Contact Enquiry — Wayanad Resorts*',
      `Name: ${name}`,
      `Phone: ${phone}`,
      `Email: ${email}`,
      `Message: ${message}`,
    ].join('\n'),
  );
  this.messageSent = true;
  this.submitted = false;
  this.form.reset();
}
```

**`contact-page.component.html`** — the success banner now reads:

> Thank you — your message has been opened in WhatsApp. Press **Send** there
> to deliver it, and we'll get back to you within 24 hours.

---

## 6. How It Was Verified

Both flows were tested end-to-end in a real Chromium browser (Playwright)
against `ng serve`:

- Submitting an **empty** form opens nothing — validation blocks it.
- Submitting a **filled** form opens a new tab whose URL is
  `https://wa.me/919847041503?text=...`, and the decoded text contains every
  form field.
- The booking success card (with reference number) and the contact success
  banner both render after submit.

To re-check manually: run `npm start`, open `http://localhost:4200/booking`,
fill the form, submit, and confirm WhatsApp opens with the message addressed
to the resort's number.

---

## 7. Changing Things Later

| I want to… | Do this |
|---|---|
| Change the receiving number | Edit `RESORT_WHATSAPP_NUMBER` in `whatsapp.service.ts` (digits only, with country code) |
| Change the message wording | Edit `buildWhatsappMessage()` in `booking-page.component.ts` or the array in `contact-page.component.ts` |
| Add WhatsApp to another form | Inject `WhatsappService`, build a string, call `send()` synchronously inside the submit handler |
| Send truly automatically (no user tap) | Not possible from a static site — requires the WhatsApp Business API + a backend (e.g. Twilio, Meta Cloud API) |
