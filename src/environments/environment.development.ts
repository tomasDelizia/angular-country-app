import { Region } from './../app/country/types/region.type';
export const environment = {
  // API Keys
  googleMapsApiKey: import.meta.env.NG_APP_GOOGLE_MAPS_API_KEY,
  // URLs
  restCountriesApiUrl: 'https://restcountries.com/v3.1',
  // String constants
  apiRegions: <Region[]>[
    'Africa',
    'Americas',
    'Asia',
    'Europe',
    'Oceania',
    'Antarctic',
  ],
};
