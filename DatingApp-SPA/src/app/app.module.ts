// Node modules
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BsDropdownModule, TabsModule, BsDatepickerModule, PaginationModule, ButtonsModule } from 'ngx-bootstrap';
import { RouterModule } from '@angular/router';
import { NgxGalleryModule } from 'ngx-gallery';
import { FileUploadModule } from 'ng2-file-upload';
import { JwtModule } from '@auth0/angular-jwt';
import { TimeAgoPipe } from 'time-ago-pipe';

// Local components
import { AppComponent } from './app.component';
import { NavComponent } from './nav/nav.component';
import { AuthService } from './_services/auth.service';
import { HomeComponent } from './home/home.component';
import { RegisterComponent } from './register/register.component';
import { ErrorInterceptorProvider } from './_services/error.interceptor';
import { AlertifyService } from './_services/alertify.service';
import { MemberListComponent } from './members/member-list/member-list.component';
import { ListComponent } from './list/list.component';
import { MessagesComponent } from './messages/messages.component';
import { appRoutes } from './routes';
import { AuthGuard } from './_guards/auth.guard';
import { UserService } from './_services/user.service';
import { MemberCardComponent } from './members/member-card/member-card.component';
import { MemberDetailComponent } from './members/member-detail/member-detail.component';
import { MemberDetailResolver } from './_resolver/member-detail.resolver';
import { MemberListResolver } from './_resolver/member-list.resolver';
import { MemberEditComponent } from './members/member-edit/member-edit.component';
import { MemberEditResolver } from './_resolver/member-edit.resolver';
import { PreventUnsavedChangesGuard } from './_guards/prevent-unsaved-changes.guard';
import { PhotoEditorComponent } from './members/photo-editor/photo-editor.component';
import { ListsResolver } from './_resolver/lists.resolver';
import { MessagesResolver } from './_resolver/messages.resolver';
import { MemberMessagesComponent } from './members/member-messages/member-messages.component';
import { AdminPanelComponent } from './admin/admin-panel/admin-panel.component';
import { HasRoleDirective } from './_directives/hasRole.directive';
import { UserManagementComponent } from './admin/user-management/user-management.component';
import { PhotoManagementComponent } from './admin/photo-management/photo-management.component';
import { AdminService } from './_services/admin.service';

// Added a new way to handle the tokens using JwtModule.
// We will get the token inside our app.module.ts, we will import the JwtModule
// and we will configure it to send up the token for any domain listed in the
// 'whitelistedDomain' and any 'blacklistedDomain' route we are not going
// to send the token with.
export function tokenGetter() {
  return localStorage.getItem('token');
}

@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    HomeComponent,
    RegisterComponent,
    MemberListComponent,
    ListComponent,
    MessagesComponent,
    MemberCardComponent,
    MemberDetailComponent,
    MemberEditComponent,
    PhotoEditorComponent,
    // This is a pipe so we will add it on the declarations - https://www.npmjs.com/package/time-ago-pipe
    TimeAgoPipe,
    MemberMessagesComponent,
    AdminPanelComponent,
    HasRoleDirective,
    UserManagementComponent,
    PhotoManagementComponent
  ],
  imports: [
    BrowserModule,
    // We will be importing this inside our value.component in order to get the values from our DatingApp.API
    // with the Http service that it provides like HttpClient which allows us to do an Http GET request
    // and retrieve values from the server.  The HttpClient can be injected in the ValueComponent (value.component.ts)
    // constructor like constructor(private http:HttpClient)
    HttpClientModule,
    // We need to tell Angular we will be using the Forms module which is used for submitting username and password
    FormsModule,
    // We need to import the reactive forms module so that we can use reactive forms
    // in our register.component.ts
    ReactiveFormsModule,
    // Add the NGX dropdown module - https://valor-software.com/ngx-bootstrap/#/dropdowns
    BsDropdownModule.forRoot(),
    // Add the NGX datepicker module - https://valor-software.com/ngx-bootstrap/#/datepicker
    BsDatepickerModule.forRoot(),
    // Add the NGX pagination module - https://valor-software.com/ngx-bootstrap/#/pagination
    PaginationModule.forRoot(),
    // Add the NGX buttons module - https://valor-software.com/ngx-bootstrap/#/buttons
    ButtonsModule.forRoot(),
    // Add a router to our SPA which is defined in the routes.ts
    RouterModule.forRoot(appRoutes),
    // Import the NGX Gallery for our image gallery - https://lukasz-galka.github.io/ngx-gallery-demo/
    NgxGalleryModule,
    // Import the NG2 File Uploader - https://valor-software.com/ng2-file-upload/
    FileUploadModule,
    // Imports the JwtModule so that we can send the token automatically when
    // we will do an API request rather than creating headers manually as
    // example found in user.services.ts
    JwtModule.forRoot({
      config: {
        tokenGetter: tokenGetter,
        // In production, if we will have our Angular pages hosted in the same
        // domain with the API, for example under the API wwwroot folder "../DatingApp.API/wwwroot",
        // then we don't need to specify a whitelistedDomains
        whitelistedDomains: ['localhost:5000'],
        blacklistedRoutes: ['localhost:5000/api/auth']
      }
    }),
    // Import the tab module so that we can use the tab controls in our components
    TabsModule.forRoot()
  ],
  // Add the services we have created
  // Add the error interceptors
  // Add router guards
  providers: [
    AuthService,
    ErrorInterceptorProvider,
    AlertifyService,
    AuthGuard,
    UserService,
    MemberDetailResolver,
    MemberListResolver,
    MemberEditResolver,
    ListsResolver,
    MessagesResolver,
    PreventUnsavedChangesGuard,
    AdminService
  ],
  // When the module is loaded, its gonna bootstrap the AppComponent which is the app.component.ts
  bootstrap: [AppComponent]
})
export class AppModule { }
