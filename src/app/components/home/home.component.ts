import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private router: Router){
  }

  ngOnInit(): void {
  }



  dropdownVisible = false;

  showDropdown() {
    this.dropdownVisible = true;
  }

  hideDropdown() {
    this.dropdownVisible = false;
  }


  ContactDialogVisible = false;

  openContactDialog(){
    this.ContactDialogVisible = true;
  }

  logout(){
    localStorage.removeItem("authToken");
    this.router.navigate(['/login']);

  }
}
