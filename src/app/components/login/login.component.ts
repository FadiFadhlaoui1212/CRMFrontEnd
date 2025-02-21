import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { loginRequest } from 'src/models/loginRequest';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { LoginResponse } from 'src/app/interfaces/loginResponse';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  showSuccessfulLoginMessage: boolean = false;

  showLoginErrorMessage: boolean = false;


  loginForm: FormGroup = new FormGroup({
    email: new FormControl(),
    password: new FormControl()
  });

  constructor(private authService: AuthenticationService, private router: Router ) { }

  ngOnInit(): void {
  }

  onSubmit(){
    const request: loginRequest = {
      email: this.loginForm.value.email,
      password: this.loginForm.value.password
    };
    console.log(request);
    this.authService.login(request).subscribe(
      response => {
        alert("Logged in successfully");
        console.log("Logged in successfully", response);
        localStorage.removeItem("authToken");
        const token = response.token;
        localStorage.setItem("authToken", token);
        console.log(token);
        this.router.navigate(['/home']);
        this.showSuccessfulLoginMessage= true;
        setTimeout(() => {
          this.showSuccessfulLoginMessage = false;
        }, 3000);
      },
      error => {
        this.showSuccessfulLoginMessage= true;
        setTimeout(() => {
          this.showSuccessfulLoginMessage = false;
        }, 3000);
        console.log('Error creating user:', error);
      }
    )
  }

}
