import { Component, OnInit, ViewChild } from '@angular/core';
import { ContactService } from 'src/app/services/contact.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { TitleEnum, Contact } from 'src/models/contact';
import { DialogModule } from 'primeng/dialog';
import { CountriesService } from 'src/app/services/countries.service';
import { ContactCreationRequest } from 'src/models/contactCreationRequest';
import { Message } from '@angular/compiler/src/i18n/i18n_ast';
import { MessageService } from 'primeng/api';
import { MessageModule } from 'primeng/message';
import { MessagesModule } from 'primeng/messages';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { ConfirmationService } from 'primeng/api';
import { Table } from 'primeng/table'; // ✅ Import the correct Table type




@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {

  /*visibleCreation: boolean = false;

  visibleEdit: boolean = false;

  messages: Message[] = [];

  showCreationMessage: boolean = false;

  showUpdateMessage: boolean = false;

  showOwnershipMessage: boolean = false;

  showErrorMessage: boolean = false;

  textMessage: string = "";

  profileImage: string = 'assets/no-profile-picture.png'; 

  profileImageSrc: string | null = "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png";

  rowsPerPage: number = 10; // Number of rows per page
  totalRecords: number = 0;
  currentPage: number = 0;

  paginate(event: any) {
    this.currentPage = event.first;
    this.rowsPerPage = event.rows;
    this.filteredContacts = this.contacts.slice(this.currentPage, this.currentPage + this.rowsPerPage);
  }


  uploadImage(event: any) {
    const file = event.target.files[0];  // Get the uploaded file
    if (file) {
      const reader = new FileReader();

      this.contactService.uploadPicture(event, this.contactToUpdateId).subscribe(
        response => {
          if (response == "Profile picture uploaded successfully!" ) {
            console.log("The picture has been uploaded successfully !!!");
            reader.onload = (e: any) => {
              this.profileImageSrc = e.target.result;  // Set new image
            };
            reader.readAsDataURL(file);  // Convert to Base64 URL
            this.showUpdateMessage = true;
            setTimeout(() => {
              this.showUpdateMessage = false;
            }, 3000);
          }
          else {
            this.showOwnershipMessage = true;
            setTimeout(() => {
              this.showOwnershipMessage = false;
            }, 3000);
          }

        },
        error => {
          console.log('Error uploading the picture', error);
          this.showErrorMessage = true;
          setTimeout(() => {
            this.showErrorMessage = false;
          }, 3000);
        }
      )
    }
  }
  




  countries: { name: string; code: string; flag: string;}[] = [];

  contactToUpdateId: number = 0;


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

    return this.filteredContacts.sort((a, b) => {
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
    this.contactService.getProfilePicture(contact.id).subscribe((blob) => {
      console.log(blob);
      const reader = new FileReader();

      
      reader.onloadend = () => {
        this.profileImageSrc = reader.result as string; // Convert Blob to Base64 URL
      };

      if(blob.size==0 || blob == null){
        this.profileImageSrc = "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png";
      }

  
      reader.readAsDataURL(blob); // Read as data URL
    }, (error) => {
      console.error("Error loading profile image:", error);
    });
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
    const request: ContactCreationRequest = this.contactCreationForm.value;
    console.log(request);

    this.contactService.createContact(request).subscribe(
      response => {
        const newContact: Contact = response;
        this.contacts.push(newContact);
        this.filteredContacts.push(newContact);
        this.showCreationMessage = true;
        setTimeout(() => {
          this.showCreationMessage = false;
        }, 3000);

      },
      error => {
        console.log('Error creating contact:', error);
        this.showErrorMessage = true;
        setTimeout(() => {
          this.showErrorMessage = false;
        }, 3000);
      }
    )
  }

  editContact(){
    const request: ContactCreationRequest = this.contactEditForm.value;

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

  constructor(private contactService: ContactService, private countriesService: CountriesService, private messageService: MessageService, private sanitizer: DomSanitizer ) { }

  ngOnInit(): void {
    this.loadCountries();
    this.contactService.getContacts()
    .subscribe(
      response => {
        this.contacts = response;
        this.filteredContacts = this.contacts;
        this.totalRecords = this.contacts.length;
        this.paginate({ first: 0, rows: this.rowsPerPage });
      },
      error => {
        console.log("error has occured"+error);
      },
      () => {                                   //complete() callback
        console.error('Request completed');     //This is actually not needed 
      });

  }
*/

@ViewChild('dt') dt!: Table;

contactDialog: boolean = false;

contacts: Contact[] = [];

contact: any = {};

jobs: any[] = [
  {label: "CEO", value: "CEO"},
  {label: "ENGINEER", value: "ENGINEER"},
  {label: "MANAGER", value: "MANAGER"},
  {label: "DEVELOPER", value: "DEVELOPER"},
  {label: "ANALYST", value: "ANALYST"}
];


selectedContacts: Contact[]  = [];

submitted: boolean = false;

creatingContact: boolean = true;
editingContact: boolean = true;
profileImageSrc: string = "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png";

formData: FormData = new FormData();

countries: any[] = [];


constructor(private contactService: ContactService, private countriesService: CountriesService, private messageService: MessageService, private confirmationService: ConfirmationService) { }

BlobResult(picture: Blob):string {
  const blobUrl = URL.createObjectURL(picture);
  return blobUrl;
}


uploadImage(event: Event){
  const input = event.target as HTMLInputElement;
  if (input.files && input.files[0]) {
    const file = input.files[0];
    const reader = new FileReader();
    reader.onload = () => {
      this.profileImageSrc = reader.result as string;
    };
    reader.readAsDataURL(file);
    this.formData.append('file', file);
}
}

filterContacts(eventTarget: any) {
  if (this.dt) {
    this.dt.filterGlobal(eventTarget.value, 'contains');
  }
}

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

ngOnInit() {
  this.loadCountries();
  this.contactService.getContacts()
  .subscribe(
    response => {
      this.contacts = response;
      for (let c of this.contacts){
        c.user.fullname = c.user.firstname + c.user.lastname;
      }
    },
    error => {
      console.log("error has occured"+error);
    },
    () => {                                   //complete() callback
      console.error('Request completed');     //This is actually not needed 
    });
}

openNew() {
    this.contact = {};
    this.submitted = false;
    this.contactDialog = true;
    this.creatingContact = true;
    this.editingContact = false;
}

getValue(e: EventTarget){
  return (e as HTMLInputElement).value;
}
log(e:EventTarget) {
console.log((e as HTMLInputElement).value);
}

deleteSelectedContacts() {
    this.confirmationService.confirm({
        message: 'Are you sure you want to delete the selected contacts?',
        header: 'Confirm',
        icon: 'pi pi-exclamation-triangle',
        accept: () => {
          const contactsIds: number[] = this.selectedContacts.map(contact => contact.id);
          this.contactService.deleteContacts(contactsIds).subscribe(
            response => {
              if (response.message == "The accounts have been deleted successfully !!!") {
                this.contacts = this.contacts.filter(val => !this.selectedContacts.includes(val));
                this.selectedContacts = [];
                this.messageService.add({severity:'success', summary: 'Successful', detail: 'Contacts Deleted', life: 3000});
              }
              else {
                this.messageService.add({severity:'warn', summary: 'Warning', detail: response.message , life: 3000});
              }
            },
            error => {
              this.messageService.add({severity:'error', summary: 'Error', detail: 'An error has occured', life: 3000});
            }
          );
        }
    });
}

editContact(contact: Contact) {
    /*this.contactService.updateContact(this.contactToUpdateId, request).subscribe */
    this.editingContact = true;
    this.creatingContact = false;

    this.contact = {...contact};
    this.contactDialog = true;
    this.contactService.getProfilePicture(contact.id).subscribe((blob) => {
      const reader = new FileReader();      
      reader.onloadend = () => {
        if(blob.size==0 || blob == null){
          this.profileImageSrc = "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png";
        }
        else {
          this.profileImageSrc = reader.result as string; // Convert Blob to Base64 URL
        }
      };
        reader.readAsDataURL(blob); // Read as data URL      
    }, (error) => {
      console.error("Error loading profile image:", error);
    });
}

deleteContact(contact: Contact) {
    this.confirmationService.confirm({
        message: 'Are you sure you want to delete ' + contact.firstName + contact.lastName + '?',
        header: 'Confirm',
        icon: 'pi pi-exclamation-triangle',
        accept: () => {
          this.contactService.deleteContact(contact.id).subscribe(
            response => {
              if (response.message == "The contact has been deleted successfully !!!"){
                this.contacts = this.contacts.filter(c => (c.id!=contact.id));
                this.messageService.add({severity:'success', summary: 'Successful', detail: 'Contact Deleted', life: 3000});
              }
              else {
                this.messageService.add({severity:'warn', summary: 'Warn', detail: 'You cannot delete the contact since you are not the owner', life: 3000});
              }
            },
            error => {
              this.messageService.add({severity:'error', summary: 'Error', detail: 'An error has occured', life: 3000});
            }
          )  
        }
    });
}

hideDialog() {
    this.contactDialog = false;
    this.submitted = false;
}

saveContact() {
  const request = this.contact;
  console.log("contact", this.contact);
  console.log("request", request);
  if(this.creatingContact){
    this.contactService.createContact(request).subscribe(
      response => {
        const newContact: Contact = response;
        this.contacts.push(newContact);
        this.contacts = [...this.contacts]; // Assign a new array reference
        this.contactService.uploadPicture(request.id, this.formData).subscribe(
          response => {
            console.log(response);
          },
          error => {
            this.messageService.add({severity:'error', summary: 'Error', detail: 'Error while uploading the Picture', life: 3000});
            console.log("Here is the Error", error);
          }
        )
        this.messageService.add({severity:'success', summary: 'Successful', detail: 'Contact Created', life: 3000});
        this.contactDialog = false;
        this.contact = {};
        this.submitted = true;
      },
      error => {
        this.messageService.add({severity:'error', summary: 'Error', detail: 'An error has occured', life: 3000});
      }
    )
  }
  else {
    this.contactService.updateContact(this.contact.id, request).subscribe(
      response => {
        if (response.message == "The contact has been updated successfully !!!"){
          this.contacts.forEach((item, index) => {
            for (let i = 0 ; i < this.contacts.length ; i ++){
              if (this.contacts[i].id == request.id){
                console.log("Yes We found it !!!!!", request.id);
                this.contacts[i] = request;
              }
              this.contacts = [...this.contacts]; // Assign a new array reference
              this.contactService.uploadPicture(request.id, this.formData).subscribe(
                response => {
                  console.log(response);
                },
                error => {
                  this.messageService.add({severity:'error', summary: 'Error', detail: 'Error while uploading the Picture', life: 3000});
                  console.log("Here is the Error", error);
                }
              )
            }
          }
          )
          this.messageService.add({severity:'success', summary: 'Successful', detail: 'Contact Updated', life: 3000});
        }
        else {
          this.messageService.add({severity:'warn', summary: 'warning', detail: 'You cannot update this contact since you are not the owner', life: 3000});
        }
      },
      error => {
        this.messageService.add({severity:'error', summary: 'Error', detail: 'An error has occured', life: 3000});
      }
    )

    this.contactDialog = false;
    this.contact = {};
    this.submitted = true;
  }
}

findIndexById(id: number): number {
    let index = -1;
    for (let i = 0; i < this.contacts.length; i++) {
        if (this.contacts[i].id === id) {
            index = i;
            break;
        }
    }
    return index;
}


}

