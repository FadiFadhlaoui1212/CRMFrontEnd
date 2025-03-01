import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { CountriesService } from 'src/app/services/countries.service';
import { ContactService } from 'src/app/services/contact.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { TitleEnum, Contact } from 'src/app/models/contact';
import { DialogModule } from 'primeng/dialog';
import { ContactCreationRequest } from 'src/app/models/contactCreationRequest';
import { Message } from '@angular/compiler/src/i18n/i18n_ast';
import { MessageService } from 'primeng/api';
import { MessageModule } from 'primeng/message';
import { MessagesModule } from 'primeng/messages';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { ConfirmationService } from 'primeng/api';
import { Table } from 'primeng/table'; // ✅ Import the correct Table type


@Component({
  selector: 'app-contact-form',
  templateUrl: './contact-form.component.html',
  styleUrls: ['./contact-form.component.css']
})
export class ContactFormComponent implements OnInit {

  @Input() contact: any = {};

  jobs: any[] = [
    {label: "CEO", value: "CEO"},
    {label: "ENGINEER", value: "ENGINEER"},
    {label: "MANAGER", value: "MANAGER"},
    {label: "DEVELOPER", value: "DEVELOPER"},
    {label: "ANALYST", value: "ANALYST"}
  ];

  @Input() creatingContact: boolean = true;
  @Input() editingContact: boolean = false;
  @Input() submitted: boolean = false;

  @Output() hideDialogMsg = new EventEmitter<string>();

  @Output() SuccessMsg = new EventEmitter<string>();

  @Output() ErrorMsg = new EventEmitter<string>();

  @Output() WarningMsg = new EventEmitter<string>();

  @Output() createdContact = new EventEmitter<any>();

  @Output() editedContact = new EventEmitter<any>();

  formData: FormData = new FormData();

  countries: any[] = [];

  @Input() profileImageSrc: string = "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png";

  constructor(private countriesService: CountriesService, private contactService: ContactService, private messageService: MessageService) { }

  ngOnInit(): void {
    this.loadCountries();
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

  uploadImage(event: Event){
    const input = event.target as HTMLInputElement;
    if (input.files && input.files[0]) {
      const file = input.files[0];
      const reader = new FileReader();
      reader.onload = () => {
        this.profileImageSrc = reader.result as string;
      };
      reader.readAsDataURL(file);
      if (this.formData.has('file')) {
        this.formData.delete('file');
      }
      this.formData.append('file', file);
  }
  }

  hideDialog(){
    this.submitted = false;
    this.hideDialogMsg.emit("Hide the Dialog");
  }

  saveContact() {
    const request = this.contact;
    console.log("This is the contact", this.contact.firstName);
    console.log("editing: " +this.editingContact+" creating: " + this.creatingContact);
    if(this.creatingContact){
      this.contactService.createContact(request).subscribe(
        response => {
          const newContact: Contact = response;
          this.SuccessMsg.emit("The contact has been added successfully");
          const file = this.formData.get('file');
          if (file instanceof File){
            this.contactService.uploadPicture(newContact.id, this.formData).subscribe(
              response => {
                this.SuccessMsg.emit("The profile Picture has been uploaded successfully")                
              },
              error => {
                this.ErrorMsg.emit("an Error has occured while uploading the profile picture");
              }
            )
          }
          this.createdContact.emit(newContact);
          this.contact = {};
          this.submitted = true;
        },
        error => {
          this.ErrorMsg.emit("An Error has occured while creating the contact");
        }
      )
    }
    else {
      this.contactService.updateContact(request.id, request).subscribe(
        response => {
          if (response.message == "The contact has been updated successfully !!!"){  
              this.SuccessMsg.emit("The contact has been updated successfully");
              const file = this.formData.get('file');
              if (file instanceof File){
                this.contactService.uploadPicture(request.id, this.formData).subscribe(
                  response => {
                    this.SuccessMsg.emit("The profile picture has been uploaded successfully");
                  },
                  error => {
                    this.ErrorMsg.emit("An Error has occured while uploading the picture");
                  }
                )
              }
            this.editedContact.emit(request);
          }
          else {
            this.WarningMsg.emit("You cannot update this contact since you are not the owner");
            this.hideDialogMsg.emit("close the dialog please");
          }
        },
        error => {
          this.ErrorMsg.emit("An Error has occured while updating the contact");
          this.hideDialogMsg.emit("close the dialog please");
        }
      )  
      this.contact = {};
      this.submitted = true;
    }
  }



}
