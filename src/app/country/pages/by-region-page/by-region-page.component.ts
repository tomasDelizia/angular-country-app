import { Component, inject, linkedSignal, signal } from '@angular/core';
import { CountryListComponent } from '../../components/country-list/country-list.component';
import { environment } from '@environments/environment';
import { Region } from '../../types/region.type';
import { rxResource } from '@angular/core/rxjs-interop';
import { Country } from '../../interfaces/country.interface';
import { of } from 'rxjs';
import { CountryService } from '../../services/country.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-by-region-page',
  imports: [CountryListComponent],
  templateUrl: './by-region-page.component.html',
})
export default class ByRegionPageComponent {
  countryService = inject(CountryService);

  activatedRoute = inject(ActivatedRoute);
  router = inject(Router);

  queryParam = this.activatedRoute.snapshot.queryParamMap.get('region');

  regions = environment.apiRegions;
  selectedRegion = linkedSignal<Region | null>(
    () => (this.queryParam as Region) ?? null
  );

  countryResource = rxResource<Country[], any>({
    request: () => ({ region: this.selectedRegion() }),
    loader: ({ request }) => {
      if (!request.region) return of([]);
      this.router.navigate(['/country/by-region'], {
        queryParams: {
          region: request.region,
        },
      });
      return this.countryService.searchByRegion(request.region);
    },
  });
}
