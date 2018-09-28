import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { JwtHelperService } from '@auth0/angular-jwt';

// This allows us to make the service injectible.  Components does not need this decorator
// since components are automatically injectible.
@Injectable({
  // Any components that will use this service will tell it which module is providing the service.  In this
  // case it is the root module with is the app.module.ts.  When we add a new service, then we need to
  // add it on our app.module.ts under the providers:[] array.
  providedIn: 'root'
})
export class AuthService {

  baseUrl = 'http://localhost:5000/api/auth/';
  jwtHelper = new JwtHelperService();

  constructor(private http: HttpClient) { }

  // This will take the model parameter that we have specified in the nav.component.ts
  login(model: any) {
    // Observable -- is a stream of data that is coming back from the server and in order
    // get this observable data, we need to subscribe to it

    // We will return an http POST with first parameter as the URL, second is the Body which we will send the
    // model that will contain like
    //{
    //  "Username": "john",
    //  "Password": "password"
    // }
    // and the third part is if we need to add options for this request like Headers.  Do we need add Headers
    // for this specific request.  This is a post request and typically you might want to send Headers depending
    // on the API you are using.  Since we are using ASP.NET CORE, it is expected to receive the content
    // as application/json.  This is also the default header for Angular
    // Since this just a log-in request, we don't need a third parameter.
    // The response will return a token (as seen in Postman).  And in order to do Observable when it comes back
    // from the server, we need to use rxjs operator.  We are using rxjs 6 for this course since we are using Angular 6.    
    return this.http.post(this.baseUrl + 'login', model)
      // And in order to use rxjs map operators in Angular 6, we need to pass it through a pipe() method.
      // This allows us to chain rxjs operators with our request
      // We already know (from Postman), that we will get an object as a return for this request with 'token' as key and
      // the actual token as value as defined in \DatingApp.API\Controllers\AuthController.cs

      // var token = tokenHandler.CreateToken(tokenDescriptor);
      //  return Ok(new
      //  {
      //    token = tokenHandler.WriteToken(token)
      //  });
      .pipe(
        // We are now using the rxjs map operator
        // We will pass in the response
        map((response: any) => {
          // This will contain the token response
          const user = response;

          if (user) {
            localStorage.setItem('token', user.token);
          }
        })
      );
  }

  register(model: any) {
    return this.http.post(this.baseUrl + 'register', model);
  }

  loggedIn() {
    const token = localStorage.getItem('token');

    // We will use a third party library called angular-jwt to manage the
    // token we stored in the localStorage
    // What we CANNOT DO is to validate the token since the key to validate the
    // token is on the server \DatingApp.API\appsettings.json and we don't have
    // access to that in the client application and we don't really need to do that
    // in our client application since the client application is compiled into
    // javascript and since javascript is run on the client-side, we don't want
    // end-users to have access to the validation key

    // Confusing names: angular 1 is renamed as angularjs
    // and angular 2 is renamed as angular

    // @auth0/angular-jwt: https://github.com/auth0/angular2-jwt and go for
    // version 2.0.0

    // If there is a value in this token, and is not expired,
    // then it will return true else it will return false
    return !this.jwtHelper.isTokenExpired(token);
  }
}
