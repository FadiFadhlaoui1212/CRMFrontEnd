import { Component, OnInit } from '@angular/core';
import { ContactService } from 'src/app/services/contact.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { TitleEnum, Contact } from 'src/objects/contact';
import { DialogModule } from 'primeng/dialog';
import { CountriesService } from 'src/app/services/countries.service';
import { ContactCreationRequest } from 'src/objects/contactCreationRequest';
import { Message } from '@angular/compiler/src/i18n/i18n_ast';
import { MessageService } from 'primeng/api';
import { MessageModule } from 'primeng/message';
import { MessagesModule } from 'primeng/messages';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {

  visibleCreation: boolean = false;

  visibleEdit: boolean = false;

  messages: Message[] = [];

  showCreationMessage: boolean = false;

  showUpdateMessage: boolean = false;

  showOwnershipMessage: boolean = false;

  showErrorMessage: boolean = false;

  textMessage: string = "";





  countries: { name: string; code: string; flag: string;}[] = [];

  contactToUpdateId: number = 0;

  onBasicUploadAuto(event: Event){
    
  }

  ascendingSortOrder: boolean = true;

  searchTerm: string = "";

  filteredContacts: Contact[] = [];

  isSubString(s1: string, s2: string){
    for (let i = 0 ; i < s1.length ; i ++){
      if (s1[i]!=s2[i]){
        return false;
      }
    }
    return true;
  }

  filterContacts(){
    if (this.searchTerm!=""){
      this.filteredContacts = this.contacts.filter(contact => this.isSubString(this.searchTerm.toLocaleLowerCase(), contact.firstName.toLowerCase()));
    }
    else {
      this.filteredContacts = this.contacts;
    }
  }


  sortContacts(contacts: Contact[], column: string): Contact[] {

    this.ascendingSortOrder = !this.ascendingSortOrder;

    return contacts.sort((a, b) => {
        let valueA: any;
        let valueB: any;

        // Accessing the property dynamically using column name
        switch (column) {
            case 'firstName':
                valueA = a.firstName;
                valueB = b.firstName;
                break;
            case 'lastName':
                valueA = a.lastName;
                valueB = b.lastName;
                break;
            case 'company':
                valueA = a.company;
                valueB = b.company;
                break;
            case 'phoneNumber':
                valueA = a.phoneNumber;
                valueB = b.phoneNumber;
                break;
            case 'titleEnum':
                valueA = a.titleEnum;
                valueB = b.titleEnum;
                break;
            case 'address':
                valueA = a.address;
                valueB = b.address;
                break;
            case 'country':
                valueA = a.country;
                valueB = b.country;
                break;
            case 'city':
                valueA = a.city;
                valueB = b.city;
                break;
            case 'zipCode':
                valueA = a.zipCode;
                valueB = b.zipCode;
                break;
            case 'state':
                valueA = a.state;
                valueB = b.state;
                break;
            case 'user':
                // Sort by user's firstname (nested sorting by the user object)
                valueA = a.user.firstname;
                valueB = b.user.firstname;
                break;
            default:
                throw new Error("Invalid column name.");
        }

        // Compare the values for sorting
        if (valueA < valueB) {
            return this.ascendingSortOrder ? -1 : 1;
        }
        if (valueA > valueB) {
            return this.ascendingSortOrder ? 1 : -1;
        }
        return 0;
    });
}


  showCreationDialog(){
    this.visibleCreation = true;
  }

  showEditDialog(contact: Contact){
    this.contactEditForm.patchValue(
      {
        firstName: contact.firstName,
        lastName: contact.lastName,
        company: contact.company,
        phoneNumber: contact.phoneNumber,
        titleEnum: contact.titleEnum,
        address: contact.address,
        city: contact.city,
        country: contact.country,
        zipCode: contact.zipCode,
        state: contact.state
      }
    );
    this.visibleEdit = true;
    this.contactToUpdateId = contact.id;
  }


  contactCreationForm: FormGroup = new FormGroup({
    firstName: new FormControl('', Validators.required),
    lastName: new FormControl('', Validators.required),
    company: new FormControl('', Validators.required),
    phoneNumber: new FormControl('', Validators.required),
    titleEnum: new FormControl('', Validators.required),  // ✅ Added missing FormControl
    address: new FormControl(''),
    city: new FormControl(''),
    country: new FormControl(),
    zipCode: new FormControl(),
    state: new FormControl()
  });

  contactEditForm: FormGroup = new FormGroup({
    firstName: new FormControl('', Validators.required),
    lastName: new FormControl('', Validators.required),
    company: new FormControl('', Validators.required),
    phoneNumber: new FormControl('', Validators.required),
    titleEnum: new FormControl('', Validators.required),
    address: new FormControl(''),
    city: new FormControl(),
    country: new FormControl(),
    zipCode: new FormControl(),
    state: new FormControl()
  });

  createContact(){
    const request: ContactCreationRequest = {
      firstName: this.contactCreationForm.value.firstName,
      lastName: this.contactCreationForm.value.lastName,
      company: this.contactCreationForm.value.company,
      phoneNumber: this.contactCreationForm.value.phoneNumber,
      titleEnum: this.contactCreationForm.value.titleEnum,
      address: this.contactCreationForm.value.address,
      city: this.contactCreationForm.value.city,
      country: this.contactCreationForm.value.country.name,
      zipCode: this.contactCreationForm.value.zipCode,
      state: this.contactCreationForm.value.state
    };
    console.log(request);

    this.contactService.createContact(request).subscribe(
      response => {
        console.log("This is the token", localStorage.getItem("authToken"));
        const newContact: Contact = {
          id: response.id,
          firstName: response.firstName,
          lastName: response.lastName,
          company: response.company,
          phoneNumber: response.phoneNumber,
          titleEnum: response.titleEnum,
          user: response.user,
          address: response.address,
          city: response.city,
          country: response.country,
          zipCode: response.zipCode,
          state: response.state
        }
        this.contacts.push(newContact);
        this.showCreationMessage = true;
        setTimeout(() => {
          this.showCreationMessage = false;
        }, 3000);

      },
      error => {
        console.log('Error creating contact:', error);
      }
    )
  }

  editContact(){
    const request: ContactCreationRequest = {
      firstName: this.contactEditForm.value.firstName,
      lastName: this.contactEditForm.value.lastName,
      company: this.contactEditForm.value.company,
      phoneNumber: this.contactEditForm.value.phoneNumber,
      titleEnum: this.contactEditForm.value.titleEnum,
      address: this.contactEditForm.value.address,
      country: this.contactEditForm.value.country,
      city: this.contactEditForm.value.city,
      zipCode: this.contactEditForm.value.zipCode,
      state: this.contactEditForm.value.state
    };

    this.contactService.updateContact(this.contactToUpdateId, request).subscribe(
      response => {
        console.log(response);
        if (response.message == "The contact has been updated successfully !!!"){
          alert("The contact has been updated successfully !!!");
          let index = this.contacts.findIndex( contact => contact.id === this.contactToUpdateId);
          if (index != -1){
            this.contacts[index].firstName = this.contactEditForm.value.firstName;
            this.contacts[index].lastName = this.contactEditForm.value.lastName;
            this.contacts[index].company = this.contactEditForm.value.company;
            this.contacts[index].phoneNumber = this.contactEditForm.value.phoneNumber;
            this.contacts[index].titleEnum = this.contactEditForm.value.titleEnum;
            this.contacts[index].address = this.contactEditForm.value.address;
            this.contacts[index].country = this.contactEditForm.value.country;
            this.contacts[index].city = this.contactEditForm.value.city;
            this.contacts[index].zipCode = this.contactEditForm.value.zipCode;
            this.contacts[index].state = this.contactEditForm.value.state;
            this.showUpdateMessage = true;
            setTimeout(() => {
              this.showUpdateMessage = false;
            }, 3000);
          }
        }
        else {
          alert("You cannot update the contact since you are not the owner !!!");
          this.showOwnershipMessage= true;
          setTimeout(() => {
            this.showOwnershipMessage = false;
          }, 3000);
        }
      },
      error => {
        console.log('Error updating the contact', error);
      }
    )

  }

  deleteContact(contactId: number){
    this.contactService.deleteContact(contactId).subscribe(
      response => {
        const msg = response.message;
        if (msg == "The contact has been deleted successfully !!!"){
          this.contacts = this.contacts.filter( contact => contact.id != contactId);
        }
        else {
          alert("You cannot delete this contact since you are not the owner !!!");
        }
      },
      error => {
        console.log('Error deleting contact:', error);
      }
    )
  }





  jobTitles :{ name: string; code: string }[] = [
    {name: 'CEO', code: 'A'},
    {name: 'ENGINEER', code: 'B'},
    {name: 'MANAGER', code: 'C'},
    {name: 'DEVELOPER', code: 'D'},
    {name: 'ANALYST', code: 'E'}
  ];


  loadCountries() {
    console.log("Checking local storage for countries...");

    // 1️⃣ Check if countries exist in local storage
    const storedCountries = localStorage.getItem('countries');

    if (storedCountries) {
        // 2️⃣ If exists, use stored data
        this.countries = JSON.parse(storedCountries);
        console.log("✅ Loaded countries from local storage");
    } else {
        // 3️⃣ If not, fetch from API and save them
        console.log("❌ Countries not found in local storage. Fetching from API...");

        this.countriesService.loadCountries().subscribe(
            (data) => {
                this.countries = data.map(country => ({
                    name: country.name.common,
                    code: country.cca2,
                    flag: country.flags.svg
                }));

                // 4️⃣ Save countries in local storage
                localStorage.setItem('countries', JSON.stringify(this.countries));
                console.log("✅ Countries saved to local storage for future use");
            },
            (error) => {
                console.error("❌ Error loading countries from API", error);
            }
        );
    }
}


  onSubmit(){

  }


  loading: boolean = true;

  contacts: Contact[] = [];

  constructor(private contactService: ContactService, private countriesService: CountriesService, private messageService: MessageService ) { }

  ngOnInit(): void {
    this.loadCountries();
    this.contactService.getContacts()
    .subscribe(
      response => {
        this.contacts = response;
        this.filteredContacts = this.contacts;
      },
      error => {
        console.log("error has occured"+error);
      },
      () => {                                   //complete() callback
        console.error('Request completed');     //This is actually not needed 
      });

  }

}
