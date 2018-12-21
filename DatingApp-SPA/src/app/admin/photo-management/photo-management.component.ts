import { AlertifyService } from './../../_services/alertify.service';
import { Component, OnInit } from '@angular/core';
import { AdminService } from './../../_services/admin.service';

@Component({
  selector: 'app-photo-management',
  templateUrl: './photo-management.component.html',
  styleUrls: ['./photo-management.component.css']
})
export class PhotoManagementComponent implements OnInit {

  photos: any;

  constructor(private adminService: AdminService,
    private alertify: AlertifyService) { }

  ngOnInit() {
    this.getPhotosForApproval();
  }

  getPhotosForApproval() {
    this.adminService.getPhotosForApproval().subscribe((data) => {
      this.photos = data;
    }, error => {
      this.alertify.error(error);
    });
  }

  approvePhoto(photoId: number) {
    this.adminService.approvePhoto(photoId).subscribe(() => {
      // Remove the photo from the array
      this.photos.splice(this.photos.findIndex((p: any) => p.id === photoId), 1);
    }, error => {
      this.alertify.error(error);
    });
  }

  rejectPhoto(photoId: number) {
    this.adminService.rejectPhoto(photoId).subscribe(() => {
      // Remove the photo from the array
      this.photos.splice(this.photos.findIndex((p: any) => p.id === photoId), 1);
    }, error => {
      this.alertify.error(error);
    });
  }

}
