import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./home/home.module').then((m) => m.HomeModule),
  },
  {
    path: 'about',
    loadChildren: () => import('./about/about.module').then((m) => m.AboutModule),
  },
  {
    path: 'rooms',
    loadChildren: () => import('./rooms/rooms.module').then((m) => m.RoomsModule),
  },
  {
    path: 'amenities',
    loadChildren: () =>
      import('./amenities/amenities.module').then((m) => m.AmenitiesModule),
  },
  {
    path: 'gallery',
    loadChildren: () =>
      import('./gallery/gallery.module').then((m) => m.GalleryModule),
  },
  {
    path: 'booking',
    loadChildren: () =>
      import('./booking/booking.module').then((m) => m.BookingModule),
  },
  {
    path: 'contact',
    loadChildren: () =>
      import('./contact/contact.module').then((m) => m.ContactModule),
  },
  { path: '**', redirectTo: '' },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      scrollPositionRestoration: 'top',
      anchorScrolling: 'enabled',
    }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
