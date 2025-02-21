import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { registrationRequest } from 'src/models/registrationRequest';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {

  registrationForm: FormGroup = new FormGroup({
    firstname: new FormControl(),
    lastname: new FormControl(),
    email: new FormControl(),
    password: new FormControl(),
    confirmPassword: new FormControl()
  });

  onSubmit(){
    if(this.registrationForm.value.password == this.registrationForm.value.confirmPassword){
      const request: registrationRequest = {
        firstname: this.registrationForm.value.firstname,
        lastname: this.registrationForm.value.lastname,
        email: this.registrationForm.value.email,
        password: this.registrationForm.value.password
      };
      console.log(request);
      this.authService.register(request).subscribe(
        response => {
          alert("User created successfully !!!");
          console.log('User created successfully:', response);
        },
        error => {
          console.error('Error creating user:', error);
        }
      )

    }
    else {
      alert("Please confirm you password correctly !!!");
    }
  }

  constructor(private authService: AuthenticationService ) { }

  ngOnInit(): void {


  }

}
