import { Component, effect, input, output, signal } from '@angular/core';

@Component({
  selector: 'country-search-input',
  imports: [],
  templateUrl: './country-search-input.component.html',
})
export class CountrySearchInputComponent {
  placeholder = input<string>('Buscar');
  query = output<string>();
  // Usamos una señal para almacenar el valor más actualizado del input
  inputValue = signal<string>('');
  debounceTime = input<number>(300);

  // onCleanup es un callback que se ejecuta cuando se destruye el componente o cuando se redispara el efecto
  debounceEffect = effect((onCleanup) => {
    const value = this.inputValue();
    const timeout = setTimeout(() => {
      this.query.emit(value);
    }, this.debounceTime());
    onCleanup(() => clearTimeout(timeout));
  });

  onSearch(query: string) {
    if (query == '') return;
    this.query.emit(query.toLowerCase());
  }
}
