import { Component, input, output } from '@angular/core';

@Component({
  selector: 'country-search-input',
  imports: [],
  templateUrl: './country-search-input.component.html',
})
export class CountrySearchInputComponent {
  placeholder = input<string>('Buscar');
  query = output<string>();

  onSearch(query: string) {
    if (query == '') return;
    this.query.emit(query);
  }
}
