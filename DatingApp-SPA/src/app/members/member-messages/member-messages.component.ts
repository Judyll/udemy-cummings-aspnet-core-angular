import { AlertifyService } from './../../_services/alertify.service';
import { AuthService } from './../../_services/auth.service';
import { UserService } from './../../_services/user.service';
import { Component, OnInit, Input } from '@angular/core';
import { Message } from 'src/app/_models/message';
import { tap } from 'rxjs/operators';

@Component({
  selector: 'app-member-messages',
  templateUrl: './member-messages.component.html',
  styleUrls: ['./member-messages.component.css']
})
export class MemberMessagesComponent implements OnInit {

  @Input() recipientId: number;

  messages: Message[];
  newMessage: any = {};

  constructor(private userService: UserService, private authService: AuthService,
    private alertify: AlertifyService) { }

  ngOnInit() {
    this.loadMessages();
  }

  loadMessages() {
    // We are getting the current user id and we are adding the plus ' + ' operator
    // so that we can convert the 'nameid' to number.
    const currentUserId = +this.authService.decodedToken.nameid;

    this.userService.getMessageThread(this.authService.decodedToken.nameid, this.recipientId)
    // After the 'getMessageThread' is called, we are calling the 'markAsRead' method before
    // we will be subscribing.  But, we will only call the 'markAsRead' method for the
    // only the messages that are 'unread'.
    // We are using the 'pipe' method from 'rxjs', and in here we take advantage of using
    // the 'tap' operator which allows us to do something before we will subscribe to
    // this particular method
    .pipe(
      tap(messages => {
        for (let i = 0; i < messages.length; i++) {
          // We are checking if the message is still 'unread' and the recipient id
          // is equal to the current user id
          if (messages[i].isRead === false && messages[i].recipientId === currentUserId) {
            this.userService.markAsRead(currentUserId, messages[i].id);
          }
        }
      })
    )
    .subscribe(messages => {
      this.messages = messages;
    }, error => {
      this.alertify.error(error);
    });
  }

  sendMessage() {
    this.newMessage.recipientId = this.recipientId;
    this.userService.sendMessage(this.authService.decodedToken.nameid, this.newMessage)
    .subscribe((message: Message) => {
      // We need to the new message to the messages array.  We want to add it to the
      // start of the array so we will use 'unshift' rather than 'push'
      this.messages.unshift(message);
      this.newMessage.content = '';
    }, error => {
      this.alertify.error(error);
    });
  }
}
