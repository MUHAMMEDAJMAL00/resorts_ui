import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  HostListener,
} from '@angular/core';

interface NavLink {
  label: string;
  path: string;
  exact: boolean;
}

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
  standalone: false,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderComponent {
  isScrolled = false;
  isMenuOpen = false;

  readonly navLinks: NavLink[] = [
    { label: 'Home', path: '/', exact: true },
    { label: 'About', path: '/about', exact: false },
    { label: 'Rooms', path: '/rooms', exact: false },
    { label: 'Amenities', path: '/amenities', exact: false },
    { label: 'Gallery', path: '/gallery', exact: false },
    { label: 'Booking', path: '/booking', exact: false },
    { label: 'Contact', path: '/contact', exact: false },
  ];

  constructor(private readonly cdr: ChangeDetectorRef) {}

  @HostListener('window:scroll')
  onWindowScroll(): void {
    const scrolled = window.scrollY > 24;
    if (scrolled !== this.isScrolled) {
      this.isScrolled = scrolled;
      this.cdr.markForCheck();
    }
  }

  @HostListener('document:keydown.escape')
  onEscape(): void {
    this.closeMenu();
  }

  toggleMenu(): void {
    this.isMenuOpen = !this.isMenuOpen;
  }

  closeMenu(): void {
    if (this.isMenuOpen) {
      this.isMenuOpen = false;
      this.cdr.markForCheck();
    }
  }
}
