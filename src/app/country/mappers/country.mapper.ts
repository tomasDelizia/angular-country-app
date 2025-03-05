import { Country } from '../interfaces/country.interface';
import { RESTCountry } from '../interfaces/rest-countries.interfaces';
export class CountryMapper {
  static mapRestCountryToCountry(restCountry: RESTCountry): Country {
    return {
      cca2: restCountry.cca2,
      flag: restCountry.flag,
      flagSvg: restCountry.flags.svg,
      name: restCountry.translations['spa'].common ?? restCountry.name.common,
      officialName: restCountry.name.official,
      capital: restCountry.capital?.join(','),
      population: restCountry.population,
      independent: restCountry.independent,
      unMember: restCountry.unMember,
      languages: restCountry.languages
        ? Object.values(restCountry.languages)
        : [],
      latlng: restCountry.latlng,
      area: restCountry.area,
      gini: restCountry.gini,
      timezones: restCountry.timezones,
      continents: restCountry.continents,
      coatOfArmsSvg: restCountry.coatOfArms.svg,
    };
  }

  static mapRestCountriesToCountries(restCountries: RESTCountry[]): Country[] {
    return restCountries.map(CountryMapper.mapRestCountryToCountry);
  }
}
