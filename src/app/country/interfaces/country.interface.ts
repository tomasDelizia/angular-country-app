export interface Country {
  cca2: string;
  flag: string;
  flagSvg: string;
  name: string;
  officialName: String;
  capital: string;
  population: number;
  independent: boolean;
  unMember: boolean;
  languages: String[];
  latlng: [number, number];
  area: number;
  gini: Record<string, number>;
  timezones: string[];
  continents: string[];
  coatOfArmsSvg: string;
}
