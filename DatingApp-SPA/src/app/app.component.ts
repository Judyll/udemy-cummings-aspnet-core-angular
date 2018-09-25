import { Component } from '@angular/core';

// A class decorated with a 'Component' is a Typescript class that has Angular-component features
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Dating App';
}
