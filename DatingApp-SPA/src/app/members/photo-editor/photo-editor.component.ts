import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FileUploader } from 'ng2-file-upload';
import { Photo } from '../../_models/photo';
import { environment } from '../../../environments/environment';
import { AuthService } from '../../_services/auth.service';
import { UserService } from '../../_services/user.service';
import { AlertifyService } from '../../_services/alertify.service';

// This will be a child component of our member-edit.component.ts
// And on of the things that we will be bringing in from our member-edit.component.ts
// is a 'User' and the 'User' has an array of photos[].
@Component({
  selector: 'app-photo-editor',
  templateUrl: './photo-editor.component.html',
  styleUrls: ['./photo-editor.component.css']
})
export class PhotoEditorComponent implements OnInit {

  // We will bring the user.photos[] from our parent member-edit.component.ts
  @Input() photos: Photo[];

  // We will update our parent member-edit.component.ts with changes from this
  // child component
  @Output() getMemberPhotoChange = new EventEmitter<string>();

  // Copied from https://valor-software.com/ng2-file-upload/
  uploader: FileUploader;
  hasBaseDropZoneOver = false;

  baseUrl = environment.apiUrl;
  currentMain: Photo;

  constructor(private authService: AuthService, private userService: UserService,
    private alertify: AlertifyService) { }

  ngOnInit() {
    this.initializeUploader();
  }

  fileOverBase(e: any): void {
    this.hasBaseDropZoneOver = e;
  }

  initializeUploader() {
    this.uploader = new FileUploader({
      // This is pointing to the API \DatingApp.API\Controllers\PhotosController.cs
      // where the route specified is 'api/users/{userId}/photos'
      url: this.baseUrl + 'users/' + this.authService.decodedToken.nameid + '/photos',
      // We also need to authenticate so we need to pass the auth token
      authToken: 'Bearer ' + localStorage.getItem('token'),
      isHTML5: true,
      allowedFileType: ['image'],
      // After the photo has been successfully uploaded, we want to remove it from
      // the upload queue
      removeAfterUpload: true,
      // We want our users to click the button before we will upload
      autoUpload: false,
      // Setting the max file size to 10MB
      maxFileSize: 10 * 1024 * 1024
    });

    // Fix the ng2-file-uploader issue: Fail to load 'http://localhost:500/api/user/1/photos:
    // Response to preflight request doesn't pass access control check: The value of the
    // Access-Control-Allow-Origin header in the response must not be a the wildcard '*'
    // when the request credential mode is 'include'.  Origin 'http://localhost:4200' is
    // therefore not allowed access. The credentials mode of requests initiated by the XMLHttpRequest
    // is controlled by the withCredentials attribute.
    // We are going to extend our ng2-file-uploader that our file is not going with
    // credentials
    this.uploader.onAfterAddingFile = (file) => { file.withCredentials = false; };

    // Once the file has been uploaded, this method will give us an option
    // to do something.  And what we are going to do in this case is with the response we
    // get back from our API, we can use the response:string parameter of the onSuccessItem
    // method to get the photo properties like Id, Uri, etc so that we can display it
    // directly to the browser once the upload is successful.
    this.uploader.onSuccessItem = (item, response, status, headers) => {
      if (response) {
        const res: Photo = JSON.parse(response);

        // Building up an photo object from the response
        const photo = {
          id: res.id,
          url: res.url,
          dateAdded: res.dateAdded,
          description: res.description,
          isMain: res.isMain,
          isApproved: res.isApproved
        };

        // Add the newly uploaded photo to the photos array
        this.photos.push(photo);

        // In our API PhotosController.AddPhotoForUser, we are checking to see if
        // the user has already a main photo.  If there is no main photo, for example
        // it is the first photo uploaded by the user, then the API will set the
        // newly uploaded photo as the main photo.  So, if the newly uploaded photo
        // is successful, then we can check if it is the main photo
        if (photo.isMain) {

          // We will then emit the photo URL to be consumed by the parent member-edit.component.ts
          // or we can also say this.authService.changeMemberPhoto(photo.url) although I placed
          // this on member-edit.component.ts -> updateMainPhoto(photoUrl)
          this.getMemberPhotoChange.emit(photo.url);

          // We will save the new photo url in the local storage so that the same main
          // photo will be shown even when the user refreshes the page, we are finishing
          // the 'user' information in the local storage in the app.component.ts -> ngOnInit()
          this.authService.currentUser.photoUrl = photo.url;
          localStorage.setItem('user', JSON.stringify(this.authService.currentUser));
        }
      }
    };
  }

  setMainPhoto(photo: Photo) {
    this.userService.setMainPhoto(this.authService.decodedToken.nameid, photo.id)
      .subscribe(() => {
        // We need to find out which one is the current photo and set it to false
        // and we will set the current photo selected to be the main photo. In that way
        // we are going to instantly reflect what is going on when the user sets the
        // main photo.
        // We need to access the current main photo by using the array filter method
        // to filter out photos and assign the main photo to the currentMain field
        this.currentMain = this.photos.filter(f => f.isMain === true)[0];
        this.currentMain.isMain = false;
        photo.isMain = true;

        // We will then emit the photo URL to be consumed by the parent member-edit.component.ts
        // or we can also say this.authService.changeMemberPhoto(photo.url) although I placed
        // this on member-edit.component.ts -> updateMainPhoto(photoUrl)
        this.getMemberPhotoChange.emit(photo.url);

        // We will save the new photo url in the local storage so that the same main
        // photo will be shown even when the user refreshes the page, we are finishing
        // the 'user' information in the local storage in the app.component.ts -> ngOnInit()
        this.authService.currentUser.photoUrl = photo.url;
        localStorage.setItem('user', JSON.stringify(this.authService.currentUser));

      }, error => {
        this.alertify.error(error);
      });
  }

  deletePhoto(id: number) {
    // The second parameter of the this.alertify.confirm method is an 'OK' callback
    this.alertify.confirm('Are you sure you want to delete this photo?', () => {
      this.userService.deletePhoto(this.authService.decodedToken.nameid, id)
        .subscribe(() => {
          // We will now remove the delete photo from our photos array
          // First we need to find the index of the photo we are deleting and then
          // next is indicate how many are we deleting
          this.photos.splice(this.photos.findIndex(f => f.id === id), 1);
          this.alertify.success('Photo has been successfully deleted.');
        }, () => {
          this.alertify.error('Failed to delete the photo.');
        });
    });
  }

}
