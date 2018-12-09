import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
// We can use this for any-to-any component communication through the use of the Services.
// BehaviorSubject
// * Is a type of subject (which is a type of Observable)
// * Can be subscribed to
// * Subscribers can receive updated results
// * A subject is an observer (so we can send values to it)
// * Needs an initial value (must always return a value on subscription)
// * On subscription returns last value of subject
// * Can use the getValue() method in no observable code
import { BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';
import { JwtHelperService } from '@auth0/angular-jwt';
import { environment } from '../../environments/environment';
import { User } from '../_models/user';

// This allows us to make the service injectible.  Components does not need this decorator
// since components are automatically injectible.
@Injectable({
  // Any components that will use this service will tell it which module is providing the service.  In this
  // case it is the root module with is the app.module.ts.  When we add a new service, then we need to
  // add it on our app.module.ts under the providers:[] array.
  providedIn: 'root'
})
export class AuthService {

  // This is defined in the environment.ts
  baseUrl = environment.apiUrl + 'auth/';

  jwtHelper = new JwtHelperService();
  decodedToken: any;
  currentUser: User;

  photoUrl = new BehaviorSubject<string>('../../assets/user.png');
  // Making the this.currentPhotoUrl property 'asObservable' mean we are able to subscribe
  // to this.currentPhotoUrl property and if this is updated, then ANY components
  // subscribing to it gets updated too.  This is even if the application is refreshed,
  // we log-in, we log-out, anything we do on any occasion the
  // this.changeMemberPhoto(photoUrl: string)
  // is going to be called, our photo url will be updated everywhere or any component
  // that is subscribing to the this.currentPhotoUrl observable.
  currentPhotoUrl = this.photoUrl.asObservable();

  constructor(private http: HttpClient) { }

  // This method will update the 'this.photoUrl' behavior subject
  changeMemberPhoto(photoUrl: string) {
    // This will update the value of the this.photoUrl instead of
    // the default which is '../../assets/user.png'
    if (photoUrl) {
      this.photoUrl.next(photoUrl);
    }
  }

  // This will take the model parameter that we have specified in the nav.component.ts
  login(model: any) {
    // Observable -- is a stream of data that is coming back from the server and in order
    // get this observable data, we need to subscribe to it

    // We will return an http POST with first parameter as the URL, second is the Body which we will send the
    // model that will contain like
    // {
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
          const responseUser = response;

          if (responseUser) {
            localStorage.setItem('token', responseUser.token);

            // The .setItem second parameter accepts a string and what we are getting
            // back from our API server is an object.  So, we will use JSON.stringify
            // to convert the string into an object
            localStorage.setItem('user', JSON.stringify(responseUser.user));
            this.decodedToken = this.jwtHelper.decodeToken(responseUser.token);
            this.currentUser = responseUser.user;
            this.changeMemberPhoto(this.currentUser.photoUrl);
          }
        })
      );
  }

  register(user: User) {
    return this.http.post(this.baseUrl + 'register', user);
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

  roleMatch(allowedRoles): boolean {
    /**
      Our token is looking like

      eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.
      eyJuYW1laWQiOiIxMSIsInVuaXF1ZV9uYW1lIjoiQWRtaW4iLCJyb2xlIjpbIkFkbWluIiwi
      TW9kZXJhdG9yIl0sIm5iZiI6MTU0NDMzNzU3MywiZXhwIjoxNTQ0NDIzOTczLCJpYXQi
      OjE1NDQzMzc1NzN9.qJV0KHOdhBtZLQ-jR_KJC8JqAcr89holAUnQe7kAvAHBPrhMnAw1
      8Nkeao5ebnk2UvPfPEYdcZhcQ4sk_ZK0ew

      and if we debug it on jwt.io, the below is the result:
      {
        "nameid": "11",
        "unique_name": "Admin",
        "role": [
          "Admin",
          "Moderator"
        ],
        "nbf": 1544337573,
        "exp": 1544423973,
        "iat": 1544337573
      }

      The token is stored in the this.decodedToken field so we can get the roles
      if we will use this.decodedToken.role
    */
    const userRoles = this.decodedToken.role as Array<string>;

    let isMatch = false;
    allowedRoles.forEach(element => {
      // .includes determine whether an array includes a certain element, returning
      // true or false as appropriate
      if (userRoles.includes(element)) {
        // If we will use return true, this method will not work correctly.
        // Therefore, we need to add the field isMatch = true.
        isMatch = true;
        return;
      }
    });

    return isMatch;
  }
}
