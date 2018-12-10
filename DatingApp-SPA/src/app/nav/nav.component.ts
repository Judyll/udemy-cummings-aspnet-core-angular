import { Component, OnInit } from '@angular/core';
import { AuthService } from '../_services/auth.service';
import { AlertifyService } from '../_services/alertify.service';
// Provides the navigation and url manipulation capabilities
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {

  model: any = {};
  photoUrl: string;

  constructor(public authService: AuthService,
    private alertify: AlertifyService, private router: Router) { }

  ngOnInit() {
    // We will subscribe to the 'currentPhotoUrl' observable so that we can
    // set the user photo in the nav bar every time other components like
    // the photo-editor.component.ts changes the user main
    // photo.  Remember, this nav.component.ts is not a parent/child component of
    // the photo-editor.component.ts
    this.authService.currentPhotoUrl.subscribe(returnUrl => {
      this.photoUrl = returnUrl;
    });
  }

  login() {
    // We will subscribe to the login method which is an observable
    // and we need to do on the next, and error options
    this.authService.login(this.model).subscribe(success => {
      this.alertify.success('Logged in successfully');
    }, error => {
      this.alertify.error(error);
    }, () => {
      // We will use an anonymous function for the 'complete' 3rd parameter of the
      // subscribe method.
      // We will us this to add additional option for our router though we can also
      // achieve the same effect when we will place this code under 'successs' 1st parameter
      // We will be routed to the /members page as defined in the routes.ts
      this.router.navigate(['/members']);
    });
  }

  loggedIn() {
    // const token = localStorage.getItem('token');

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

    // If there is a value in this token, then it will return true else it will return false
    // return !!token;
    return this.authService.loggedIn();
  }

  logOut() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');

    this.authService.decodedToken = null;
    this.authService.currentUser = null;

    this.alertify.message('Logged out');
    this.router.navigate(['/home']);
  }

}
