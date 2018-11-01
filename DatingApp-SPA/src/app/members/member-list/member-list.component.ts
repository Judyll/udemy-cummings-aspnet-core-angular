import { Component, OnInit } from '@angular/core';

// We need to go UP an extra level '../../' because we are now on 2 levels lower 
import { User } from '../../_models/user';
import { UserService } from '../../_services/user.service';
import { AlertifyService } from '../../_services/alertify.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-member-list',
  templateUrl: './member-list.component.html',
  styleUrls: ['./member-list.component.css']
})
export class MemberListComponent implements OnInit {

  users: User[];

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
    });
  }

  // We no longer need this since we are using resolvers member-list.resolver.ts to
  // get the data
  //loadUsers() {
  //  this.userService.getUsers().subscribe((success: User[]) => {
  //    this.users = success;
  //  }, error => {
  //    this.alertify.error(error);
  //  });
  //}

}
