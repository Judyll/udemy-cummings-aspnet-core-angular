import { AlertifyService } from './../../_services/alertify.service';
import { AdminService } from './../../_services/admin.service';
import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/_models/user';
import { BsModalService, BsModalRef } from 'ngx-bootstrap';
import { RolesModalComponent } from '../roles-modal/roles-modal.component';
@Component({
  selector: 'app-user-management',
  templateUrl: './user-management.component.html',
  styleUrls: ['./user-management.component.css']
})
export class UserManagementComponent implements OnInit {

  users: User[];
  bsModalRef: BsModalRef;

  // We are importing the modalService: BsModalService since we will be calling
  // the NGX Bootstrap modal when we will be editing the user roles
  // -https://valor-software.com/ngx-bootstrap/#/modals#service-component
  constructor(private adminService: AdminService,
    private alertify: AlertifyService, private modalService: BsModalService) { }

  ngOnInit() {
    this.getUsersWithRoles();
  }

  getUsersWithRoles() {
    this.adminService.getUsersWithRoles().subscribe((data: User[]) => {
      this.users = data;
    }, error => {
      this.alertify.error(error);
    });
  }

  editRolesModal(user: User) {
    const initialState = {
      user,
      roles: this.getRolesArray(user)
    };
    this.bsModalRef = this.modalService.show(RolesModalComponent, {initialState});
    // We need to make use of the 'updateSelecteRoles' output property from the
    // roles-modal.component.ts inside this parent component.  We will get this from
    // the 'bsModalRef.content' property.
    this.bsModalRef.content.updateSelectedRoles.subscribe((values: any) => {
      const rolesToUpdate = {
        // We are going use the .filter operator to filter out any of the role names that
        // are not checked. After the filter, we are just going to return only the name so we
        // will use the .map operator since our API AdminController.EditRoles(string userName, RoleEditDto roleEditDto)
        // only needs the role names.
        // We are using the spread '...' operator which is a great feature in javascript
        // which spreads the values into a new array
        roleNames: [...values.filter((el: any) => el.checked === true)
          .map((el: any) => el.name)]
      };

      if (rolesToUpdate) {
        this.adminService.updateUserRoles(user, rolesToUpdate).subscribe(() => {
          user.roles = [...rolesToUpdate.roleNames];
        }, error => {
          this.alertify.error(error);
        });
      }
    });
  }

  private getRolesArray(user: User) {
    const roles = [];
    const userRoles = user.roles;
    const availableRoles: any[] = [
      {name: 'Admin', value: 'Admin'},
      {name: 'Moderator', value: 'Moderator'},
      {name: 'Member', value: 'Member'},
      {name: 'VIP', value: 'VIP'}
    ];

    // We need to display which roles the user is a member of that we are going to display
    // in our modal.  So, we need to loop to the availableRoles array and check if any of the
    // userRoles match and show them as 'checked' if they are.
    for (let i = 0; i < availableRoles.length; i++) {
      let isMatch = false;
      for (let j = 0; j < userRoles.length; j++) {
        if (availableRoles[i].name === userRoles[j]) {
          isMatch = true;
          availableRoles[i].checked = true;
          roles.push(availableRoles[i]);
          break;
        }
      }
      if (!isMatch) {
        availableRoles[i].checked = false;
        roles.push(availableRoles[i]);
      }
    }

    return roles;
  }

}
