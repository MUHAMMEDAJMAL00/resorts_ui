import { Component, inject } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-contact-page',
  templateUrl: './contact-page.component.html',
  styleUrl: './contact-page.component.css',
  standalone: false,
})
export class ContactPageComponent {
  private readonly fb = inject(FormBuilder);

  submitted = false;
  messageSent = false;

  readonly form = this.fb.nonNullable.group({
    name: ['', [Validators.required, Validators.minLength(2)]],
    phone: ['', [Validators.required, Validators.pattern(/^[0-9+\-\s()]{7,17}$/)]],
    email: ['', [Validators.required, Validators.email]],
    message: ['', [Validators.required, Validators.minLength(10)]],
  });

  hasError(controlName: string): boolean {
    const control = this.form.get(controlName);
    return !!control && control.invalid && (control.touched || this.submitted);
  }

  onSubmit(): void {
    this.submitted = true;
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    // No backend yet — acknowledge the message inline.
    this.messageSent = true;
    this.submitted = false;
    this.form.reset();
  }
}
