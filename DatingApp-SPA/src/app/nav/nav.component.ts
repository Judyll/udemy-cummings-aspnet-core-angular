import { Component, OnInit } from '@angular/core';
import { AuthService } from '../_services/auth.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {

  model: any = {};

  constructor(private authService: AuthService) { }

  ngOnInit() {
  }

  login() {
    // We will subscribe to the login method which is an observable
    // and we need to do on the next, and error options
    this.authService.login(this.model).subscribe(success => {
      console.log('Logged in successfully');
    }, error => {
      console.log('Failed to login');
    });
  }

  loggedIn() {
    const token = localStorage.getItem('token');

    // If there is a value in this token, then it will return true else it will return false
    return !!token;
  }

  logOut() {
    localStorage.removeItem('token');
    console.log('Logged out');
  }

}
