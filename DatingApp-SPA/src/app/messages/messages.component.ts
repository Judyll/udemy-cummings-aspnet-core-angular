import { PaginatedResult } from './../_models/pagination';
import { AlertifyService } from './../_services/alertify.service';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from './../_services/auth.service';
import { UserService } from './../_services/user.service';
import { Component, OnInit } from '@angular/core';
import { Message } from '../_models/message';
import { Pagination } from '../_models/pagination';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.css']
})
export class MessagesComponent implements OnInit {

  messages: Message[];
  pagination: Pagination;
  messageContainer = 'Unread';

  constructor(private userService: UserService, private authService: AuthService,
    private route: ActivatedRoute, private alertify: AlertifyService) { }

  ngOnInit() {
    // We are going to pass the data to the route and retrieve the data from the route
    // resolver itself so that there is no way this component will be loaded without
    // the data available.
    // This will prevent messages.component.html from using elvies / ? / safe navigation operator
    // to fix the error ERROR TypeError: Cannot read property 'knownAs' of undefined
    // We are now getting the data from the 'route' itself as defined in the routes.ts
    // for the messages.component.ts (MessagesComponent) which is assigned to the
    // messages.resolver.ts (MessagesResolver) where success['messages'] is the property
    // name that we gave in the routes.ts.
    this.route.data.subscribe(success => {
      this.messages = success['messages'].result;
      this.pagination = success['messages'].pagination;
    });
  }

  // This is for the pagination and is copied from https://valor-software.com/ngx-bootstrap/#/pagination
  pageChanged(event: any): void {
    this.pagination.currentPage = event.page;
    this.loadMessages();
  }

  loadMessages() {
    this.userService.getMessages(this.authService.decodedToken.nameid,
      this.pagination.currentPage, this.pagination.itemsPerPage, this.messageContainer)
      .subscribe(
        (res: PaginatedResult<Message[]>) => {
          this.messages = res.result;
          this.pagination = res.pagination;
        }, error => {
          this.alertify.error(error);
        }
      );
  }

  deleteMessage(id: number) {
    // We are giving the user to confirm if they will proceed on deleting the
    // message or not
    // We added the callback function () => {}
    this.alertify.confirm('Are you sure you want to delete this message', () => {
      // We added an anonymous function () => {} since we are not getting anything back
      // from this function
      this.userService.deleteMessage(id, this.authService.decodedToken.nameid).subscribe(() => {
        // We need to remove the message immediately from the browser view that
        // the user gonna see.  That means we are going to use the javascript 'splice'
        // method to do so.
        // We will find the index of the messages array and we will delete only 1 message
        this.messages.splice(this.messages.findIndex(m => m.id === id), 1);
        this.alertify.success('Message has been deleted.');
      }, () => {
        this.alertify.error('Failed to delete the message.');
      });
    });
  }
}
