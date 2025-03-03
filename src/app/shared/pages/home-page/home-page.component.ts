import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AppFooterComponent } from '../../components/app-footer/app-footer.component';

@Component({
  selector: 'app-home-page',
  imports: [RouterLink],
  templateUrl: './home-page.component.html',
})
export class HomePageComponent {}
