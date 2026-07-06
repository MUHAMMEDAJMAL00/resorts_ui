import { ChangeDetectionStrategy, Component, OnInit, inject } from '@angular/core';

import { MotionService } from './core/services/motion.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  standalone: false,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent implements OnInit {
  private readonly motion = inject(MotionService);

  ngOnInit(): void {
    // Boot the site-wide motion system (Lenis smooth scrolling + ScrollTrigger).
    this.motion.init();
  }
}
