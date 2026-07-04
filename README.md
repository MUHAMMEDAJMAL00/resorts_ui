# Wayanad Resorts — Resort Booking Website

A premium resort booking website built with **Angular 19 (module-based, NOT standalone)**,
**Bootstrap 5** and **Font Awesome** — no other runtime dependencies.
Built phase-by-phase following the spec in `test.md`.

## Run

```bash
npm install
ng serve        # http://localhost:4200
ng build        # production build to dist/resort-booking
```

## Architecture

```
src/app/
  core/            # models (Room, Amenity, Testimonial, Booking + enums) and data services
  shared/          # SharedModule: section-header, page-banner, star-rating, room-card
  layout/          # LayoutModule: header (glass sticky nav), footer
  home/            # lazy: hero slider, about preview, stats counters, testimonials, booking CTA
  about/           # lazy: story + values
  rooms/           # lazy: 6 room cards (shared RoomCardComponent)
  amenities/       # lazy: amenity card grid
  gallery/         # lazy: image grid with hover zoom
  booking/         # lazy: reactive booking form + live stay summary
  contact/         # lazy: reactive contact form + details + map placeholder
```

- Every feature module is lazy-loaded via `loadChildren` in `AppRoutingModule`.
- Design tokens (colors, shadow scale, radius scale, fonts, motion) live in
  `src/assets/css/variables.css` — no hardcoded hex values in components.
- Exactly two button variants (`.btn-resort--primary`, `.btn-resort--secondary`)
  and one card surface (`.surface-card`) defined once in `src/styles.css`.
- Glassmorphism is used in exactly two places: the sticky header (on scroll)
  and the hero content panel.
- `ChangeDetectionStrategy.OnPush` on all presentational components;
  `NgOptimizedImage` for all images.
- TypeScript `strict` mode is on; room types and booking status use enums.

## Images

All images under `src/assets/images/` are **SVG placeholders** generated for
development. Replace each one with a real photo of the same base name
(e.g. `room-deluxe-ocean-view.jpg`) and update the paths in
`core/services/*.service.ts` and the hero/CTA components.

## Booking flow

The booking page pre-selects a room via query param (`/booking?room=<id>`),
validates dates (check-out must be after check-in), computes nights and an
estimated total, and simulates submission through `BookingService`
(replace with a real `HttpClient` call when an API exists).
