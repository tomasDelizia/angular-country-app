import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { catchError, map, Observable, of, tap, throwError } from 'rxjs';
import { Country } from '../interfaces/country.interface';
import { CountryMapper } from '../mappers/country.mapper';
import { RESTCountry } from '../interfaces/rest-countries.interfaces';
import { Region } from '../types/region.type';

@Injectable({
  providedIn: 'root',
})
export class CountryService {
  private http = inject(HttpClient);

  // No es necesario que sea una señal
  private queryCapitalCache = new Map<string, Country[]>();
  private queryCountryCache = new Map<string, Country[]>();
  private queryRegionCache = new Map<Region, Country[]>();

  searchByCapital(query: string): Observable<Country[]> {
    if (this.queryCapitalCache.has(query)) {
      console.log(`Existe la búsqueda "${query}" en la caché`);
      return of(this.queryCapitalCache.get(query) ?? []);
    }
    console.log(
      `No existe la búsqueda "${query}" en la caché, consultando el servidor`
    );
    return this.http
      .get<RESTCountry[]>(`${environment.restCountriesApiUrl}/capital/${query}`)
      .pipe(
        map(CountryMapper.mapRestCountriesToCountries),
        tap((countries) => this.queryCapitalCache.set(query, countries)),
        tap((countries) =>
          countries.sort((c1, c2) => c1.name.localeCompare(c2.name))
        ),
        catchError((error) => {
          console.log('Error searchByCapital', error);
          return throwError(
            () => new Error(`No se encontró un país con la capital ${query}`)
          );
        })
      );
  }

  searchByCountry(query: string): Observable<Country[]> {
    if (this.queryCountryCache.has(query)) {
      console.log(`Existe la búsqueda "${query}" en la caché`);
      return of(this.queryCountryCache.get(query) ?? []);
    }
    console.log(
      `No existe la búsqueda "${query}" en la caché, consultando el servidor`
    );
    return this.http
      .get<RESTCountry[]>(`${environment.restCountriesApiUrl}/name/${query}`)
      .pipe(
        map(CountryMapper.mapRestCountriesToCountries),
        tap((countries) => this.queryCountryCache.set(query, countries)),
        tap((countries) =>
          countries.sort((c1, c2) => c1.name.localeCompare(c2.name))
        ),
        catchError((error) => {
          console.log('Error searchByCountry', error);
          return throwError(
            () => new Error(`No se encontró un país con el nombre ${query}`)
          );
        })
      );
  }

  searchByRegion(region: Region): Observable<Country[]> {
    if (this.queryRegionCache.has(region)) {
      console.log(`Existe la búsqueda "${region}" en la caché`);
      return of(this.queryRegionCache.get(region) ?? []);
    }
    console.log(
      `No existe la búsqueda "${region}" en la caché, consultando el servidor`
    );
    return this.http
      .get<RESTCountry[]>(`${environment.restCountriesApiUrl}/region/${region}`)
      .pipe(
        map(CountryMapper.mapRestCountriesToCountries),
        tap((countries) => this.queryRegionCache.set(region, countries)),
        tap((countries) =>
          countries.sort((c1, c2) => c1.name.localeCompare(c2.name))
        ),
        catchError((error) => {
          console.log('Error searchByRegion', error);
          return throwError(
            () => new Error(`No se encontró un país de la región ${region}`)
          );
        })
      );
  }

  searchByAlphaCode(code: string): Observable<Country | undefined> {
    return this.http
      .get<RESTCountry[]>(`${environment.restCountriesApiUrl}/alpha/${code}`)
      .pipe(
        map(CountryMapper.mapRestCountriesToCountries),
        map((countries) => countries.at(0)),
        catchError((error) => {
          console.log('Error searchByAlphaCode', error);
          return throwError(
            () => new Error(`No se encontró un país con el código ${code}`)
          );
        })
      );
  }
}
