import { Component, OnInit, Input } from '@angular/core';
import { Photo } from '../../_models/photo';

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

  constructor() { }

  ngOnInit() {
  }

}
