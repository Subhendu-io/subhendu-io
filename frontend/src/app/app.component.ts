import { Component } from '@angular/core';
import { environment } from '@env/environment';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  logo = environment.APP_LOGO;
  title = 'Developer | ' + environment.COMPANY_NAME;

  constructor() { }
}
