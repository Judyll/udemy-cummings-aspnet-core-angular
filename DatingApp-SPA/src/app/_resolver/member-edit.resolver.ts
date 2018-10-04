import { Injectable } from '@angular/core';
import { Resolve, Router, ActivatedRouteSnapshot } from '@angular/router';
import { User } from '../_models/user';
import { UserService } from '../_services/user.service';
import { AlertifyService } from '../_services/alertify.service';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AuthService } from '../_services/auth.service';

// This is a resolver that will return a single type of User
// This is consumed by member-edit.component.ts as defined in the route.ts

@Injectable({
  providedIn: 'root'
})
export class MemberEditResolver implements Resolve<User>{

  constructor(private userService: UserService, private authService: AuthService,
    private router: Router, private alertify: AlertifyService) { }

  resolve(route: ActivatedRouteSnapshot): Observable<User> {
    // This automatically subscribe to the .getUser() method so we don't need to
    // subscribe this ourselves.
    // This time, we will use the 'decodedToken' from auth.service.ts to get the
    // user Id
    return this.userService.getUser(this.authService.decodedToken.nameid)
      // We want to catch any errors that occur so that we can so that we can redirectly
      // use a back and also get back of the method as well
      .pipe(
        catchError(error => {
          this.alertify.error('Problem retrieving your data');
          // We will navigate them back to the /members page
          this.router.navigate(['/members']);
          // We will return an observable of type null by using the of() method from 'rxjs'
          return of(null);
        })
      );
  }
}
