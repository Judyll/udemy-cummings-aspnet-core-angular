import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { AuthService } from '../_services/auth.service';
import { AlertifyService } from '../_services/alertify.service';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { BsDatepickerConfig } from 'ngx-bootstrap';
import { User } from '../_models/user';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  // This will allow output from this component which is an emit event
  // and make sure EventEmitter is from @angular/core
  @Output() cancelRegister = new EventEmitter();

  // We are now swapping this for a strongly typed User object
  // model: any = {};
  user: User;

  // Tracks the value and validity state of a group of FormControl instances.
  registerForm: FormGroup;

  // Used for the NGX Boostrap datepicker configuration to add styling
  // We only need to set the theme using the 'containerClass' property but there are
  // other properties in the BsDatepickerConfig class that are not optional.
  // To go around with this, then we need to declare 'bsConfig' as 'Partial' class
  // which means we only need to implement parts of the BsDatepickerConfig class
  bsConfig: Partial<BsDatepickerConfig>;

  constructor(private authService: AuthService,
    private alertify: AlertifyService, private fb: FormBuilder,
    private router: Router) { }

  ngOnInit() {

    this.bsConfig = {
      containerClass: 'theme-red'
    };

    // Create the register form in the ngOnInit() life cycle
    // which takes form controls and out-of-the-box validators as well
    // This is another way of creating a form
    // this.registerForm = new FormGroup({
    //  username: new FormControl('', Validators.required),
    //  password: new FormControl('', [Validators.required, Validators.minLength(4),
    //  Validators.maxLength(8)]),
    //  confirmPassword: new FormControl('', Validators.required)
    // }, this.passwordMatchValidator);

    this.createRegisterForm();
  }

  // Create a registration form using FormBuilder
  createRegisterForm() {
    this.registerForm = this.fb.group({
      gender: ['male'],
      username: ['', Validators.required],
      knownAs: ['', Validators.required],
      dateOfBirth: [null, Validators.required],
      city: ['', Validators.required],
      country: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(4),
        Validators.maxLength(8)]],
      confirmPassword: ['', Validators.required]
    }, {
        validator: this.passwordMatchValidator
      });
  }

  // Custom validator that checks if the password matches
  passwordMatchValidator(g: FormGroup) {
    return g.get('password').value === g.get('confirmPassword').value ? null
      : { 'mismatch': true };
  }

  register() {

    // Since we are using reactive forms now, then we can check if the register form
    // is in a valid state
    if (this.registerForm.valid) {
      // We will get the values in our register form and we will pass it to the
      // user object by using Object.assign which copies the values of all
      // enumerable own properties from one or more source objects to a
      // target object.
      this.user = Object.assign({}, this.registerForm.value);

      // We will now register the user
      this.authService.register(this.user).subscribe(() => {
        this.alertify.success('Registration successful');
      }, error => {
        this.alertify.error(error);
      }, () => {
        // The third part of the subscribe method is what to do on complete
        // and on complete, we will automatically
        // log-in the user once they have successful registered
        this.authService.login(this.user).subscribe(() => {
          this.router.navigate(['/members']);
        });
      });
    }

    //// For the 'success' and 'error' parameter, we will just use empty () since we are not using anything
    //// from this response
    // this.authService.register(this.model).subscribe(() => {
    //  this.alertify.success('Registration successful');
    // }, error => {
    //  // This will be the http response that we will get back from the server
    //  // Typical error configured is a Bad Request that we set in \DatingApp.API\Controllers\AuthController.cs
    //  // RegisterNewUser method or model state validations (required, string length) that we
    //  // set on \DatingApp.API\Dtos\UserForRegisterDto.cs
    //  this.alertify.error(error);
    // });

    // console.log(this.registerForm.value);
  }

  cancel() {

    // We are just emitting a simple boolean value but this can be any value, or object, or data
    this.cancelRegister.emit(false);
  }
}
