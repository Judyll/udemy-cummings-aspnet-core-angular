import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { AuthService } from '../_services/auth.service';
import { AlertifyService } from '../_services/alertify.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  // This will allow input from parent component
  @Input() valuesFromHome: any;

  // This will allow output from this component which is an emit event
  // and make sure EventEmitter is from @angular/core
  @Output() cancelRegister = new EventEmitter();

  model: any = {};

  constructor(private authService: AuthService,
    private alertify: AlertifyService) { }

  ngOnInit() {
  }

  register() {

    // For the 'success' and 'error' parameter, we will just use empty () since we are not using anything
    // from this response
    this.authService.register(this.model).subscribe(() => {
      this.alertify.success('Registration successful');
    }, error => {
      // This will be the http response that we will get back from the server
      // Typical error configured is a Bad Request that we set in \DatingApp.API\Controllers\AuthController.cs
      // RegisterNewUser method or model state validations (required, string length) that we
      // set on \DatingApp.API\Dtos\UserForRegisterDto.cs
      this.alertify.error(error);
    });
  }

  cancel() {

    // We are just emitting a simple boolean value but this can be any value, or object, or data
    this.cancelRegister.emit(false);
  }
}
