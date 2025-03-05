import {
  Component,
  effect,
  input,
  linkedSignal,
  output,
  signal,
} from '@angular/core';

@Component({
  selector: 'country-search-input',
  imports: [],
  templateUrl: './country-search-input.component.html',
})
export class CountrySearchInputComponent {
  placeholder = input<string>('Buscar');
  debounceTime = input<number>(300);
  initialValue = input<string>('');
  // Usamos una señal para almacenar el valor más actualizado del input
  // Un linkedSignal es útil cuando necesitamos inicializarla con el valor de otra señal o variable
  inputValue = linkedSignal<string>(() => this.initialValue());
  query = output<string>();

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
