import { Location } from '@angular/common';
import { Component, inject, input } from '@angular/core';

@Component({
  selector: 'country-error-message',
  imports: [],
  templateUrl: './error-message.component.html',
})
export class ErrorMessageComponent {
  location = inject(Location);

  errorMessage = input<string | unknown>('Error');

  goBack() {
    this.location.back();
  }
}
