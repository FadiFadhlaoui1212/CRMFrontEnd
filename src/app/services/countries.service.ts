import { Injectable, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CountriesService implements OnInit {

  constructor(private http: HttpClient) { }

  loadCountries() {
    return this.http.get<any[]>('https://restcountries.com/v3.1/all');
  }

  ngOnInit(): void {
    
  }
}
