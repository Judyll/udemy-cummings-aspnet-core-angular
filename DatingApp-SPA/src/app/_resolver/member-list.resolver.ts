import { Injectable } from '@angular/core';
import { Resolve, Router, ActivatedRouteSnapshot } from '@angular/router';
import { User } from '../_models/user';
import { UserService } from '../_services/user.service';
import { AlertifyService } from '../_services/alertify.service';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { PaginatedResult } from '../_models/pagination';

// This is a resolver that will return an array of type User
// This is consumed by member-list.component.ts as defined in the route.ts

@Injectable({
  providedIn: 'root'
})
export class MemberListResolver implements Resolve<PaginatedResult<User[]>>{

  pageNumber = 1;
  pageSize = 6; //Setting is differently from our API for testing purposes

  constructor(private userService: UserService, private router: Router,
    private alertify: AlertifyService) { }

  resolve(route: ActivatedRouteSnapshot): Observable<PaginatedResult<User[]>> {
    // This automatically subscribe to the .getUsers() method so we don't need to
    // subscribe this ourselves.
    return this.userService.getUsers(this.pageNumber, this.pageSize)
      // We want to catch any errors that occur so that we can so that we can redirectly
      // use a back and also get back of the method as well
      .pipe(
        catchError(() => {
          this.alertify.error('Problem retrieving data');
          // We will navigate them back to the /home page
          this.router.navigate(['/home']);
          // We will return an observable of type null by using the of() method from 'rxjs'
          return of(null);
        })
      );
  }
}
