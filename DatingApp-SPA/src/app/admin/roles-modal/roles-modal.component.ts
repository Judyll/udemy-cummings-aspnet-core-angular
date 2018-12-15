import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap';
import { User } from 'src/app/_models/user';
@Component({
  selector: 'app-roles-modal',
  templateUrl: './roles-modal.component.html',
  styleUrls: ['./roles-modal.component.css']
})
export class RolesModalComponent implements OnInit {

  // We need to get the selected roles information outside of this modal and eventually
  // update our API.  We also need to look how to extract the information from the modal
  // as well.  We need to look into the relationship of the RolesModalComponent with the
  // UserManagementComponent.  Technically, the RolesModalComponent is a child component
  // of the UserManagementComponent.  So, in order to get the information of a child component
  // to update the parent component where this RolesModalComponent is being shown from,
  // we are going to use @Output property to do this.
  @Output() updateSelectedRoles = new EventEmitter();

  // The 'user' and 'roles' property must be the same as the one declared in the
  // user-management.component.ts editRolesModal() method:
  // const initialState = {
  //   user,
  //   roles: this.getRolesArray(user)
  // };
  user: User;
  // This list is populated in the user-management.component.ts editRolesModal() method
  roles: any[];

  constructor(public bsModalRef: BsModalRef) { }

  ngOnInit() {
  }

  updateRoles() {
    this.updateSelectedRoles.emit(this.roles);
    this.bsModalRef.hide();
  }

}
