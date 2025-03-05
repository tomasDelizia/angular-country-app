import { Component, effect, inject, signal } from '@angular/core';
import { CountryListComponent } from '../../components/country-list/country-list.component';
import { environment } from '@environments/environment';
import { Region } from '../../types/region.type';
import { rxResource } from '@angular/core/rxjs-interop';
import { Country } from '../../interfaces/country.interface';
import { of } from 'rxjs';
import { CountryService } from '../../services/country.service';

@Component({
  selector: 'app-by-region-page',
  imports: [CountryListComponent],
  templateUrl: './by-region-page.component.html',
})
export default class ByRegionPageComponent {
  countryService = inject(CountryService);

  regions = environment.apiRegions;
  selectedRegion = signal<Region | null>(null);

  countryResource = rxResource<Country[], any>({
    request: () => ({ region: this.selectedRegion() }),
    loader: ({ request }) => {
      if (!request.region) return of([]);
      return this.countryService.searchByRegion(request.region);
    },
  });
}
