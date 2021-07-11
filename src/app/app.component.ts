import { Component, LOCALE_ID, Inject } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'POC-crud-app';

  locales = [
    {code: 'en-US', label: 'English'},
    {code: 'hi', label: 'हिंदी'},
  ]

  constructor(@Inject(LOCALE_ID) protected localeId: string){}
}
