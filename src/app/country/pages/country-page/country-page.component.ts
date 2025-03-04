import { Component, inject } from '@angular/core';
import { rxResource } from '@angular/core/rxjs-interop';
import { ActivatedRoute } from '@angular/router';
import { Country } from '../../interfaces/country.interface';
import { CountryService } from '../../services/country.service';
import { ErrorMessageComponent } from '../../../shared/components/error-message/error-message.component';

@Component({
  selector: 'app-country-page',
  imports: [ErrorMessageComponent],
  templateUrl: './country-page.component.html',
})
export default class CountryPageComponent {
  countryService = inject(CountryService);
  countryCode = inject(ActivatedRoute).snapshot.params['code'];

  countryResource = rxResource<Country | undefined, any>({
    request: () => ({ code: this.countryCode }),
    loader: ({ request }) =>
      this.countryService.searchByAlphaCode(request.code),
  });
}
