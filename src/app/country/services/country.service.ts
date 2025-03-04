import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { catchError, map, Observable, throwError } from 'rxjs';
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
      .pipe(
        map(CountryMapper.mapRestCountriesToCountries),
        catchError((error) => {
          console.log('Error searchByCapital', error);
          return throwError(
            () => new Error(`No se encontró un país con la capital ${query}`)
          );
        })
      );
  }

  searchByCountry(query: string): Observable<Country[]> {
    return this.http
      .get<RESTCountry[]>(`${environment.restCountriesApiUrl}/name/${query}`)
      .pipe(
        map(CountryMapper.mapRestCountriesToCountries),
        catchError((error) => {
          console.log('Error searchByCountry', error);
          return throwError(
            () => new Error(`No se encontró un país con el nombre ${query}`)
          );
        })
      );
  }
}
