import { Component, OnInit, ViewChild } from '@angular/core';
import { User } from '../../_models/user';
import { ActivatedRoute } from '@angular/router';
import { AlertifyService } from '../../_services/alertify.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-member-edit',
  templateUrl: './member-edit.component.html',
  styleUrls: ['./member-edit.component.css']
})
export class MemberEditComponent implements OnInit {

  // We need to access the html form with id='editForm' since we need
  // to reset its state once the save changes button is clicked so that
  // the alert header will be hidden and the save changes button will be disabled
  // again.  For this, we need the @ViewChild decorator
  @ViewChild('editForm') editForm: NgForm;

  user: User;

  constructor(private route: ActivatedRoute, private alertify: AlertifyService) { }

  ngOnInit() {
    // We are going to pass the data to the route and retrieve the data from the route
    // resolver itself so that there is no way this component will be loaded without
    // the data available.
    // This will prevent member-detail.component.html from using elvies / ? / save navigation operator
    // to fix the error ERROR TypeError: Cannot read property 'knownAs' of undefined
    // We are now getting the data from the 'route' itself as defined in the routes.ts
    // for the member-edit.component.ts (MemberEditComponent) which is assigned to the
    // member-edit.resolver.ts (MemberEditResolver) where success['user'] is the property
    // name that we gave in the routes.ts.
    this.route.data.subscribe(success => {
      this.user = success['user'];
    });
  }

  updateUser() {
    console.log(this.user);

    this.alertify.success('Profile updated successfully!');

    // Reset the form control.  This means by default, it is marked as pristine, marked as
    // untouched and value is set to null.
    // Add the this.user as the parameter so that it will reset the elements and fill
    // the controls with the bindings coming from the this.user variable
    this.editForm.reset(this.user);
  }

}
