import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http'; // Make sure this is the same lib on the app.module.ts

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  registerMode = false;

  constructor(private http: HttpClient) { }

  ngOnInit() { }

  setRegisterMode(mode: boolean) {
    this.registerMode = mode;
  }

}
