import { Component, OnInit } from '@angular/core';

// We need to go UP an extra level '../../' because we are now on 2 levels lower 
import { User } from '../../_models/user';
import { UserService } from '../../_services/user.service';
import { AlertifyService } from '../../_services/alertify.service';

@Component({
  selector: 'app-member-list',
  templateUrl: './member-list.component.html',
  styleUrls: ['./member-list.component.css']
})
export class MemberListComponent implements OnInit {

  users: User[];

  constructor(private userService: UserService, private alertify: AlertifyService) { }

  ngOnInit() {
    this.loadUsers();
  }

  loadUsers() {
    this.userService.getUsers().subscribe((success: User[]) => {
      this.users = success;
    }, error => {
      this.alertify.error(error);
    });
  }

}
