import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { registrationRequest } from 'src/models/registrationRequest';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { loginRequest } from 'src/models/loginRequest';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor (private http: HttpClient) {}

  register( request: registrationRequest){
    let URL = "http://localhost:9090/api/v1/auth/register";
    const headers = new HttpHeaders({'Content-Type': 'application/json'}); 
    return this.http.post<registrationRequest>(URL, request, {headers });
  }

  login (request: loginRequest): Observable<any>{
    let URL = "http://localhost:9090/api/v1/auth/authenticate";
    const headers = new HttpHeaders({'Content-Type': 'application/json'});
    return this.http.post<loginRequest>(URL, request, {headers});
  }


}
