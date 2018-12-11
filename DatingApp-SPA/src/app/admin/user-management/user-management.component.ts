import { AlertifyService } from './../../_services/alertify.service';
import { AdminService } from './../../_services/admin.service';
import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/_models/user';

@Component({
  selector: 'app-user-management',
  templateUrl: './user-management.component.html',
  styleUrls: ['./user-management.component.css']
})
export class UserManagementComponent implements OnInit {

  users: User[];

  constructor(private adminService: AdminService,
    private alertify: AlertifyService) { }

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

}
