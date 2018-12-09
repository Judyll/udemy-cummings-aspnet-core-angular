import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot } from '@angular/router';
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
  // Before we only used the code
  // canActivate(): Observable<boolean> | Promise<boolean> | boolean
  // But, since we are now adding roles to our route in the routes.ts
  // path: 'admin', component: AdminPanelComponent,
  // data: { roles: ['Admin', 'Moderator']}
  // we are now using canActivate(next: ActivatedRouteSnapshot)
  // where ActivatedRouteSnapshot gives us access to the data: { roles: ['Admin', 'Moderator']}
  // property that we sepcified in the routes.ts
  canActivate(next: ActivatedRouteSnapshot): Observable<boolean> | Promise<boolean> | boolean {

    // We want to get the roles that are listed in the data: { roles: ['Admin', 'Moderator']}
    // property.  And since our AuthGuard is protecting child routes in the routes.ts,
    // we are using the .firstChild.data property.
    // And then we will get the 'roles' which is how we named it inside the routes
    const roles = next.firstChild.data['roles'] as Array<string>;

    // We will check if we have values inside the roles since we don't need to add
    // roles to each of our route
    if (roles) {
      const match = this.authService.roleMatch(roles);
      if (match) {
        return true;
      } else {
        this.router.navigate(['members']);
        this.alertify.error('You are not authorized to access this area.');
      }
    }

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
