import { Routes } from '@angular/router'
import { HomeComponent } from './home/home.component';
import { MemberListComponent } from './member-list/member-list.component';
import { MessagesComponent } from './messages/messages.component';
import { ListComponent } from './list/list.component';

export const appRoutes: Routes = [
  // When the user is adding a url, or clicks on a link, or adding some path to the
  // url, then the router will attempt to match one of these routes and it keeps going
  // down to this list attempting to match to the url.  If nothing matches this path,
  // then it gonna use the wild card and it's gonna redirect to home.  So, the ordering
  // of these routes is important.
  { path: 'home', component: HomeComponent },
  { path: 'members', component: MemberListComponent },
  { path: 'messages', component: MessagesComponent },
  { path: 'list', component: ListComponent },
  // redirect to the full path of the home URL 
  { path: '**', redirectTo: 'home', pathMatch: 'full' }
];

