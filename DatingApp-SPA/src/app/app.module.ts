// Node modules
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { BsDropdownModule } from 'ngx-bootstrap';

// Local components
import { AppComponent } from './app.component';
import { NavComponent } from './nav/nav.component';
import { AuthService } from './_services/auth.service';
import { HomeComponent } from './home/home.component';
import { RegisterComponent } from './register/register.component';
import { ErrorInterceptorProvider } from './_services/error.interceptor';
import { AlertifyService } from './_services/alertify.service';

@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    HomeComponent,
    RegisterComponent    
  ],
  imports: [
    BrowserModule,
    // We will be importing this inside our value.component in order to get the values from our DatingApp.API
    // with the Http service that it provides like HttpClient which allows us to do an Http GET request
    // and retrieve values from the server.  The HttpClient can be injected in the ValueComponent (value.component.ts)
    // constructor like constructor(private http:HttpClient)
    HttpClientModule,
    // We need to tell Angular we will be using the Forms module which is used for submitting username and password
    FormsModule,
    BsDropdownModule.forRoot()
  ],
  // Add the services we have created
  // Add the error interceptors
  providers: [
    AuthService,
    ErrorInterceptorProvider,
    AlertifyService
  ],
  // When the module is loaded, its gonna bootstrap the AppComponent which is the app.component.ts
  bootstrap: [AppComponent] 
})
export class AppModule { }
