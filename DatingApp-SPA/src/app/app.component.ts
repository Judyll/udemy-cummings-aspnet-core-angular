import { Component, OnInit } from '@angular/core';
import { AuthService } from './_services/auth.service';
import { JwtHelperService } from '@auth0/angular-jwt';
import { User } from './_models/user';

// A class decorated with a 'Component' is a Typescript class that has Angular-component features
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  jwtHelper = new JwtHelperService();

  constructor(private authService: AuthService) { }

  ngOnInit() {

    // This will prevent the 'Welcome <Username>' on the nav.component.html
    // from showing blank once the user refreshes the page.
    // The 'token' and 'user' is retrieved and stored in the localStored in the auth.service.ts
    // in the login(model: any) method
    const token = localStorage.getItem('token');

    // We will use JSON.parse to turn a string into an object since 'user' is stored as string
    const user: User = JSON.parse(localStorage.getItem('user'));

    if (token) {
      this.authService.decodedToken = this.jwtHelper.decodeToken(token);
    }

    if (user) {
      this.authService.currentUser = user;
      this.authService.changeMemberPhoto(user.photoUrl);
    }
  }
}
