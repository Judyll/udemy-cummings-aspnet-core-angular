import { Component, OnInit, Input } from '@angular/core';
import { User } from '../../_models/user';

@Component({
  selector: 'app-member-card',
  templateUrl: './member-card.component.html',
  styleUrls: ['./member-card.component.css']
})
export class MemberCardComponent implements OnInit {

  // We are going to pass down the user property from our parent component which is
  // the member-list.component.ts
  @Input() user: User;

  constructor() { }

  ngOnInit() {
  }

}
