import { Contact } from "./contact";
import { Document } from "./document";

export enum ActivityEnum {
    CALL = "CALL",
    DINNER = "DINNER",
    EMAIL = "EMAIL",
    MANAGEMENT_COMMITTEE = "MANAGEMENT_COMMITTEE",
    MEET = "MEET",
    NOTE = "NOTE"
  }

export class Activity{
    id: number;
    date: Date;
    type: ActivityEnum;
    participants: Contact[];
    subject: string;
    note: string;
    documents: Document[];

    constructor(id: number, date: Date, type: ActivityEnum, participants: Contact[], subject: string, note: string, documents: Document[]){
        this.id = id;
        this.date = date ;
        this.type = type;
        this.participants = participants;
        this.subject = subject;
        this.note = note ;
        this.documents = documents ; 
    }

}