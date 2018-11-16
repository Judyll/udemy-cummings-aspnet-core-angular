import { Component, OnInit } from '@angular/core';

// We need to go UP an extra level '../../' because we are now on 2 levels lower
import { User } from '../../_models/user';
import { UserService } from '../../_services/user.service';
import { AlertifyService } from '../../_services/alertify.service';
import { ActivatedRoute } from '@angular/router';
import { Pagination, PaginatedResult } from '../../_models/pagination';

@Component({
  selector: 'app-member-list',
  templateUrl: './member-list.component.html',
  styleUrls: ['./member-list.component.css']
})
export class MemberListComponent implements OnInit {

  users: User[];
  user: User = JSON.parse(localStorage.getItem('user'));
  genderList = [{ value: 'male', display: 'Males' }, { value: 'female', display: 'Females' }];
  userParams: any = {};
  pagination: Pagination;

  constructor(private userService: UserService, private alertify: AlertifyService,
    private route: ActivatedRoute) { }

  ngOnInit() {
    // We are going to pass the data to the route and retrieve the data from the route
    // resolver itself so that there is no way this component will be loaded without
    // the data available.
    // This will prevent member-list.component.html from using elvies / ? / save navigation operator
    // to fix the error ERROR TypeError: Cannot read property 'knownAs' of undefined
    // We are now getting the data from the 'route' itself as defined in the routes.ts
    // for the member-list.component.ts (MemberListComponent) which is assigned to the
    // member-list.resolver.ts (MemberListResolver) where success['users'] is the property
    // name that we gave in the routes.ts.
    this.route.data.subscribe(success => {
      // When we change the return type of the member-list.resolver.ts (MemberListResolver)
      // to Observable<PaginatedResult<User[]>>, we will now use success['users'].result
      // because the users are now in the .result field of the PaginatedResult type object
      this.users = success['users'].result;
      this.pagination = success['users'].pagination;
    });

    this.userParams.gender = (this.user.gender === 'female') ? 'male' : ' female';
    this.userParams.minAge = 18;
    this.userParams.maxAge = 99;
    this.userParams.orderBy = 'lastActive';
  }

  // This is for the pagination and is copied from https://valor-software.com/ngx-bootstrap/#/pagination
  pageChanged(event: any): void {
    this.pagination.currentPage = event.page;
    this.loadUsers();
  }

  resetFilters() {
    this.userParams.gender = (this.user.gender === 'female') ? 'male' : ' female';
    this.userParams.minAge = 18;
    this.userParams.maxAge = 99;
    this.loadUsers();
  }

  loadUsers() {
    this.userService
      .getUsers(this.pagination.currentPage, this.pagination.itemsPerPage, this.userParams)
      .subscribe(
        (res: PaginatedResult<User[]>) => {
          this.users = res.result;
          this.pagination = res.pagination;
        }, error => {
          this.alertify.error(error);
        }
      );
  }

}
