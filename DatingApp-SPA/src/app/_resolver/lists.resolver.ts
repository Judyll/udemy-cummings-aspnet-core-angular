import { Injectable } from '@angular/core';
import { Resolve, Router, ActivatedRouteSnapshot } from '@angular/router';
import { User } from '../_models/user';
import { UserService } from '../_services/user.service';
import { AlertifyService } from '../_services/alertify.service';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { PaginatedResult } from '../_models/pagination';

@Injectable({
  providedIn: 'root'
})
export class ListsResolver implements Resolve<PaginatedResult<User[]>> {
  pageNumber = 1;
  pageSize = 5;
  // Set the likesParams to 'Likers' which means return the list of users
  // that likes the currently log-in user
  likesParam = 'Likers';

  constructor(private userService: UserService,
    private router: Router, private alertify: AlertifyService) { }

  resolve(route: ActivatedRouteSnapshot): Observable<PaginatedResult<User[]>> {
    return this.userService.getUsers(this.pageNumber, this.pageSize,
      null, this.likesParam).pipe(
      catchError(error => {
        this.alertify.error('Problem retrieving data');
        this.router.navigate(['/home']);
        return of(null);
      })
    );
  }
}
