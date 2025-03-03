import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class CountryService {
  private http = inject(HttpClient);

  searchByCapital(query: string) {
    return this.http
      .get(`${environment.restCountriesApiUrl}/capital/${query}`)
      .subscribe((response) => {
        console.log({ response });
      });
  }
}
