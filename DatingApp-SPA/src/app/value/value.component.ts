import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http'; // Make sure this is the same lib on the app.module.ts

@Component({
  selector: 'app-value',
  templateUrl: './value.component.html',
  styleUrls: ['./value.component.css']
})
export class ValueComponent implements OnInit {

  values: any;

  constructor(private http:HttpClient) { }

  ngOnInit() {

    this.getValues();

  }

  getValues() {

    // Observable -- is a stream of data that is coming back from the server and in order
    // get this observable data, we need to subscribe to it
    this.http.get('http://localhost:5000/api/values')
      .subscribe(response => {
        this.values = response;
      }, error => {
        console.log(error);
      })
  }

}
