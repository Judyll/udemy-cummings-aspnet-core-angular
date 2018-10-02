import { Component, OnInit } from '@angular/core';
import { User } from '../../_models/user';
import { UserService } from '../../_services/user.service';
import { AlertifyService } from '../../_services/alertify.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-member-detail',
  templateUrl: './member-detail.component.html',
  styleUrls: ['./member-detail.component.css']
})
export class MemberDetailComponent implements OnInit {

  user: User;

  constructor(private userService: UserService, private alertify: AlertifyService,
    private route: ActivatedRoute) { }

  ngOnInit() {
    // We are going to pass the data to the route and retrieve the data from the route
    // resolver itself so that there is no way this component will be loaded without
    // the data available.
    // This will prevent member-detail.component.html from using elvies / ? / save navigation operator
    // to fix the error ERROR TypeError: Cannot read property 'knownAs' of undefined
    // We are now getting the data from the 'route' itself as defined in the routes.ts
    // for the member-detail.component.ts (MemberDetailComponent) which is assigned to the
    // member-detail.resolver.ts (MemberDetailResolver) where success['user'] is the property
    // name that we gave in the routes.ts.
    this.route.data.subscribe(success => {
      this.user = success['user'];
    });
  }

  // In the URL route, we are using /members/4 or members/2 or members/5 in which the numeric
  // value is the member ID
  // We no longer require this one when we implemented the member-detail.resolver.ts
  //loadUser() {
    // We use the '+' preceeding operator to convert params['id'] from string to number
  //  this.userService.getUser(+this.route.snapshot.params['id'])
  //    .subscribe((success: User) => {
  //      this.user = success;
  //    }, error => {
  //      this.alertify.error(error);
  //    });
  //}

}
