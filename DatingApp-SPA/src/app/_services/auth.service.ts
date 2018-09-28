import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

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
}
