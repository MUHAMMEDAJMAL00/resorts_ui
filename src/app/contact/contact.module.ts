import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

import { SharedModule } from '../shared/shared.module';
import { ContactRoutingModule } from './contact-routing.module';
import { ContactPageComponent } from './contact-page/contact-page.component';

@NgModule({
  declarations: [ContactPageComponent],
  imports: [SharedModule, ContactRoutingModule, ReactiveFormsModule],
})
export class ContactModule {}
