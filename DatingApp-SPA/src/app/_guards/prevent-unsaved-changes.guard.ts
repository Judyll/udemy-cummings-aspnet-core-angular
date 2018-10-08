import { Injectable } from '@angular/core';
import { CanDeactivate } from '@angular/router';
import { MemberEditComponent } from '../members/member-edit/member-edit.component';

// This is configured as a provider in the app.module.ts
// And also added as guard in the route.ts
@Injectable({
  providedIn: 'root'
})
export class PreventUnsavedChangesGuard implements CanDeactivate<MemberEditComponent>{

  // We will pass the component: since we need to access the
  // @ViewChild('editForm') editForm: NgForm; declared in the member-edit.component.ts
  // which is really pointing to the child 
  // <form #editForm="ngForm" id="editForm" (ngSubmit)="updateUser()"> from the file
  // member-edit.component.html
  canDeactivate(component: MemberEditComponent) {
    if (component.editForm.dirty) {
      return confirm('Are you sure you want to continue? Any unsaved changes will be lost.');
    }

    return true;
  }

}
