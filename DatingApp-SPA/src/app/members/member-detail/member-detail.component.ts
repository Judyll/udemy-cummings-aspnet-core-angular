import { AuthService } from './../../_services/auth.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { User } from '../../_models/user';
import { UserService } from '../../_services/user.service';
import { AlertifyService } from '../../_services/alertify.service';
import { ActivatedRoute } from '@angular/router';
import { NgxGalleryOptions, NgxGalleryImage, NgxGalleryAnimation } from 'ngx-gallery';
import { TabsetComponent } from 'ngx-bootstrap';

@Component({
  selector: 'app-member-detail',
  templateUrl: './member-detail.component.html',
  styleUrls: ['./member-detail.component.css']
})
export class MemberDetailComponent implements OnInit {

  @ViewChild('memberTabs') memberTabs: TabsetComponent;

  user: User;

  galleryOptions: NgxGalleryOptions[];
  galleryImages: NgxGalleryImage[];

  constructor(private userService: UserService, private alertify: AlertifyService,
    private route: ActivatedRoute, private authService: AuthService) { }

  ngOnInit() {
    // We are going to pass the data to the route and retrieve the data from the route
    // resolver itself so that there is no way this component will be loaded without
    // the data available.
    // This will prevent member-detail.component.html from using elvies / ? / save navigation operator
    // to fix the error ERROR TypeError: Cannot read property 'knownAs' of undefined
    // We are now getting the data from the 'route' itself as defined in the routes.ts
    // for the member-detail.component.ts (MemberDetailComponent) which is assigned to the
    // member-detail.resolver.ts (MemberDetailResolver) where success['user'] is the property
    // name that we gave in the routes.ts.
    this.route.data.subscribe(success => {
      this.user = success['user'];
    });

    // We will be subscribing to the query parameters and we have
    // included in the router link in messages.component.html
    // [routerLink]="['/members', messageContainer == 'Outbox' ? message.recipientId : message.senderId]"
    // [queryParams]="{tab: 3}"
    this.route.queryParams.subscribe(params => {
      const selectedTab = params['tab'];
      this.selectTab(selectedTab > 0 ? selectedTab : 0);
    });

    // Configure the gallery options and set how we want it to look
    this.galleryOptions = [
      {
        width: '500px',
        height: '500px',
        imagePercent: 100,
        thumbnailsColumns: 4,
        imageAnimation: NgxGalleryAnimation.Slide,
        preview: false
      }
    ];

    this.galleryImages = this.getImages();
  }

  getImages() {

    const imageUrls = [];

    for (let i = 0; i < this.user.photos.length; i++) {
      imageUrls.push({
        small: this.user.photos[i].url,
        medium: this.user.photos[i].url,
        big: this.user.photos[i].url,
        description: this.user.photos[i].description
      });
    }

    return imageUrls;
  }

  selectTab(tabId: number) {
    this.memberTabs.tabs[tabId].active = true;
  }

  sendLike(id: number) {
    this.userService.sendLike(this.authService.decodedToken.nameid, id)
    .subscribe(() => {
      this.alertify.success('You have liked ' + this.user.knownAs);
    }, error => {
      this.alertify.error(error);
    });
  }

  // In the URL route, we are using /members/4 or members/2 or members/5 in which the numeric
  // value is the member ID
  // We no longer require this one when we implemented the member-detail.resolver.ts
  // loadUser() {
    // We use the '+' preceeding operator to convert params['id'] from string to number
  //  this.userService.getUser(+this.route.snapshot.params['id'])
  //    .subscribe((success: User) => {
  //      this.user = success;
  //    }, error => {
  //      this.alertify.error(error);
  //    });
  // }

}
