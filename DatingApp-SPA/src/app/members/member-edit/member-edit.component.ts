import { Component, OnInit, ViewChild, HostListener } from '@angular/core';
import { User } from '../../_models/user';
import { ActivatedRoute } from '@angular/router';
import { AlertifyService } from '../../_services/alertify.service';
import { NgForm } from '@angular/forms';
import { UserService } from '../../_services/user.service';
import { AuthService } from '../../_services/auth.service';

@Component({
  selector: 'app-member-edit',
  templateUrl: './member-edit.component.html',
  styleUrls: ['./member-edit.component.css']
})
export class MemberEditComponent implements OnInit {

  user: User;
  photoUrl: string;

  // We need to access template reference variable the html form with id='editForm'
  // since we need to reset its state once the save changes button is clicked so that
  // the alert header will be hidden and the save changes button will be disabled
  // again.  For this, we need the @ViewChild decorator
  @ViewChild('editForm') editForm: NgForm;

  // The prevent-unsaved-changes.guard.ts prevents the user from clicking other
  // links within the page while there are still unsaved changes in the edit form.
  // But, Angular does not have access 'outside' the route
  // that is why user still will loose some changes if the user clicks the close
  // button on the browser.  In this case, we need a HostListener.  This will prompt
  // 'Leave site' in the browser if there are still unsaved changes in the edit form.
  // We don't have any control in the pop-up and its text since it is browser-specific.
  @HostListener('window:beforeunload', ['$event'])
  unloadNotification($event: any) {
    if (this.editForm.dirty) {
      $event.returnValue = true;
    }
  }

  constructor(private route: ActivatedRoute, private alertify: AlertifyService,
    private userService: UserService, private authService: AuthService) { }

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

    // We will subscribe to the 'currentPhotoUrl' observable so that we can
    // set the user photo in the nav bar every time other components like
    // the photo-editor.component.ts changes the user main
    // photo.  Remember, this nav.component.ts is not a parent/child component of
    // the photo-editor.component.ts
    this.authService.currentPhotoUrl.subscribe(returnUrl => {
      this.photoUrl = returnUrl;
    });
  }

  updateUser() {

    // We are using the authService.decodedToken.nameid to pass the user id
    this.userService.updateUser(this.authService.decodedToken.nameid, this.user)
      .subscribe(() => {
        this.alertify.success('Profile updated successfully!');

        // Reset the form control.  This means by default, it is marked as pristine, marked as
        // untouched and value is set to null.
        // Add the this.user as the parameter so that it will reset the elements and fill
        // the controls with the bindings coming from the this.user variable
        this.editForm.reset(this.user);
      }, error => {
        this.alertify.error(error);
      });
  }

  // This method handles the 'getMemberPhotoChange' event which is emitted from the child
  // component photo-editor.component.ts define in the template member-edit.component.html
  // as (getMemberPhotoChange)="updateMainPhoto($event)"
  updateMainPhoto(photoUrl) {
    this.user.photoUrl = photoUrl;
    this.authService.changeMemberPhoto(photoUrl);
  }

}
