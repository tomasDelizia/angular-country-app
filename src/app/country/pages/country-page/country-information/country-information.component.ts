import { Component, computed, input } from '@angular/core';
import { Country } from '../../../interfaces/country.interface';
import { DecimalPipe } from '@angular/common';
import { GoogleMap } from '@angular/google-maps';

@Component({
  selector: 'country-information',
  imports: [DecimalPipe, GoogleMap],
  templateUrl: './country-information.component.html',
})
export class CountryInformationComponent {
  country = input.required<Country>();

  get giniEntries(): [string, number][] {
    return Object.entries(this.country().gini);
  }
}
