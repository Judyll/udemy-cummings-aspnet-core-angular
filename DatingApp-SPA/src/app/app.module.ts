import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { ValueComponent } from './value/value.component';

@NgModule({
  declarations: [
    AppComponent,
    ValueComponent
  ],
  imports: [
    BrowserModule,
    // We will be importing this inside our value.component in order to get the values from our DatingApp.API
    // with the Http service that it provides like HttpClient which allows us to do an Http GET request
    // and retrieve values from the server.  The HttpClient can be injected in the ValueComponent (value.component.ts)
    // constructor like constructor(private http:HttpClient)
    HttpClientModule
  ],
  providers: [],
  // When the module is loaded, its gonna bootstrap the AppComponent which is the app.component.ts
  bootstrap: [AppComponent] 
})
export class AppModule { }
