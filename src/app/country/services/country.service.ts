import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { map, Observable } from 'rxjs';
import { Country } from '../interfaces/country.interface';
import { CountryMapper } from '../mappers/country.mapper';
import { RESTCountry } from '../interfaces/rest-countries.interfaces';

@Injectable({
  providedIn: 'root',
})
export class CountryService {
  private http = inject(HttpClient);

  searchByCapital(query: string): Observable<Country[]> {
    return this.http
      .get<RESTCountry[]>(`${environment.restCountriesApiUrl}/capital/${query}`)
      .pipe(map(CountryMapper.mapRestCountriesToCountries));
  }
}
