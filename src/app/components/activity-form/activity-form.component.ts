import { Component, OnInit } from '@angular/core';
import { Contact } from 'src/app/models/contact';
import { ActivityService } from 'src/app/services/activity.service';
import { ContactService } from 'src/app/services/contact.service';
import { DocumentService } from 'src/app/services/document.service';

@Component({
  selector: 'app-activity-form',
  templateUrl: './activity-form.component.html',
  styleUrls: ['./activity-form.component.css']
})
export class ActivityFormComponent implements OnInit {

  constructor(private activityService: ActivityService, private documentService: DocumentService, private contactService: ContactService) { }

  activity: any = {}

  selectedContact: any = {};

  contacts: Contact[] = [];

  participants: { label: string; value: Contact }[] = [];

  submitted: boolean = false;

  types: any[] = [
    {label: "CALL", value: "CALL"},
    {label: "DINNER", value: "DINNER"},
    {label: "EMAIL", value: "EMAIL"},
    {label: "MANAGEMENT_COMMITTEE", value: "MANAGEMENT_COMMITTEE"},
    {label: "MEET", value: "MEET"},
    {label: "NOTE", value: "NOTE"}
  ];



  ngOnInit(): void {
    this.activity.participants = new Array<Contact>();
    this.contactService.getContacts().subscribe(
      response => {
        this.contacts = response;
        this.participants = this.contacts.map(contact => ({
          label: contact.firstName + " " + contact.lastName,
          value: contact  // Or use contact.id if you only need the ID
        }));
      },
      error => {
        console.log("An error has occured while loading the contacts", error);
      }
    )
  }

  addParticipant(){
    if(!this.activity.participants.includes(this.selectedContact)){
      this.activity.participants.push(this.selectedContact);
    }
    
    console.log(this.activity.participants);
  }

  removeParticipant(participant: Contact){
    this.activity.participants = this.activity.participants.filter((contact: Contact) => contact.id != participant.id);
  }

  saveActivity(){
    this.activityService.createActivity(this.activity).subscribe(
      response => {
        console.log(response);
      },
      error => {
        console.log(error);
      }
    )
  }

    

  }

    



