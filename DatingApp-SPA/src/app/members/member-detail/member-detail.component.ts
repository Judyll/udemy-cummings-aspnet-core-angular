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
    this.loadUser();
  }

  // In the URL route, we are using /members/4 or members/2 or members/5 in which the numeric
  // value is the member ID
  loadUser() {
    // We use the '+' preceeding operator to convert params['id'] from string to number
    this.userService.getUser(+this.route.snapshot.params['id'])
      .subscribe((success: User) => {
        this.user = success;
      }, error => {
        this.alertify.error(error);
      });
  }

}
