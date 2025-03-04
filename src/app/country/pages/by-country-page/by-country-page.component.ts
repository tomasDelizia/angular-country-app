import { Component, inject, resource, signal } from '@angular/core';
import { CountrySearchInputComponent } from '../../components/top-menu/country-search-input/country-search-input.component';
import { CountryListComponent } from '../../components/country-list/country-list.component';
import { Country } from '../../interfaces/country.interface';
import { CountryService } from '../../services/country.service';
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'app-by-country-page',
  imports: [CountrySearchInputComponent, CountryListComponent],
  templateUrl: './by-country-page.component.html',
})
export default class ByCountryPageComponent {
  countryService = inject(CountryService);
  query = signal<string>('');

  // Utilizando recursos de Angular
  countryResource = resource<Country[], any>({
    // Se aconseja que los atributos de request sean señales para que el loader se vuelva a ejecutar si cambian
    request: () => ({ query: this.query() }),
    loader: async ({ request }) => {
      if (!request.query) return [];
      return await firstValueFrom(
        this.countryService.searchByCountry(request.query)
      );
    },
  });
}
