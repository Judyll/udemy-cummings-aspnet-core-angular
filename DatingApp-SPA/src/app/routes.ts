import { AdminPanelComponent } from './admin/admin-panel/admin-panel.component';
import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { MemberListComponent } from './members/member-list/member-list.component';
import { MessagesComponent } from './messages/messages.component';
import { ListComponent } from './list/list.component';
import { AuthGuard } from './_guards/auth.guard';
import { MemberDetailComponent } from './members/member-detail/member-detail.component';
import { MemberDetailResolver } from './_resolver/member-detail.resolver';
import { MemberListResolver } from './_resolver/member-list.resolver';
import { MemberEditComponent } from './members/member-edit/member-edit.component';
import { MemberEditResolver } from './_resolver/member-edit.resolver';
import { PreventUnsavedChangesGuard } from './_guards/prevent-unsaved-changes.guard';
import { ListsResolver } from './_resolver/lists.resolver';
import { MessagesResolver } from './_resolver/messages.resolver';

export const appRoutes: Routes = [
  // When the user is adding a url, or clicks on a link, or adding some path to the
  // url, then the router will attempt to match one of these routes and it keeps going
  // down to this list attempting to match to the url.  If nothing matches this path,
  // then it gonna use the wild card and it's gonna redirect to home.  So, the ordering
  // of these routes is important.

  // Instead of using 'home', we will just use '' so that when a user paste the url
  // localhost:4200, then the user will be redirected to the home component
  { path: '', component: HomeComponent },
  // Add a dummy route so that we can guard multiple child routes
  {
    path: '',
    runGuardsAndResolvers: 'always',
    canActivate: [AuthGuard],
    children: [
      {
        path: 'members', component: MemberListComponent,
        resolve: { users: MemberListResolver }
      },
      // :id -- is how we specify the parameter of the route
      // The resolver will return a single type 'user' as define in the member-detail.resolver.ts
      {
        path: 'members/:id', component: MemberDetailComponent,
        resolve: { user: MemberDetailResolver }
      },
      // We will not pass the Id for the member that we want to edit
      // Instead, we will use the decoded token for whoever is logging in
      {
        path: 'member/edit', component: MemberEditComponent,
        resolve: { user: MemberEditResolver },
        canDeactivate: [PreventUnsavedChangesGuard]
      },
      {
        path: 'messages', component: MessagesComponent ,
        resolve: { messages: MessagesResolver }
      },
      {
        path: 'list', component: ListComponent,
        resolve: { users: ListsResolver }
      },
      {
        path: 'admin', component: AdminPanelComponent,
        // How do we tell our route which roles we want to allow ???
        // What we can also pass along with the route is a 'data' property
        // and we can access our route 'data' inside our AuthGuard (auth.guard.ts).
        // In the 'data' property, we specify 'roles' and we specify an
        // array of roles that we want to allow for this particual route
        // In our AuthGuard (auth.guard.ts), we can check which roles are allowed for a particular
        // route and make a decision to wether we will allow the routes to be activated
        // or not.
        data: { roles: ['Admin', 'Moderator']}
      }
    ]
  },
  // redirect to the full path of the home URL
  { path: '**', redirectTo: '', pathMatch: 'full' }
];

