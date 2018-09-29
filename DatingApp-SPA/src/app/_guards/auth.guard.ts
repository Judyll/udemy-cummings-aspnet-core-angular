import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../_services/auth.service';
import { AlertifyService } from '../_services/alertify.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router,
    private alertify: AlertifyService) { }

  // We don't need ActivatedRouteSnapshot and RouterStateSnapshot so we can remove it
  // AuthGuard implements CanActivate which will tell our route (defined in routes.ts)
  // if we need to activate the route or not.
  // It returns an Observable of type boolean, a Promise of type boolean, or simply a
  // boolean.  If we see this return type where there are 'pipes' or 'bar' after the
  // method name, we call it 'union type'.  As long as our return type is either of
  // the three, then we are fine.
  canActivate(): Observable<boolean> | Promise<boolean> | boolean {

    // We need to check if the user has logged-in so we need the Auth service
    if (this.authService.loggedIn()) {
      return true;
    }

    this.alertify.error('You need to log-in!');

    // We need to redirect the user if they are not logged-in so we will send them back
    // to the home page
    this.router.navigate(['/home']);

    return false;
  }
}
