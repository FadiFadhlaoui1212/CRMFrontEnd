import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Contact } from 'src/objects/contact';
import { ContactCreationRequest } from 'src/objects/contactCreationRequest';

@Injectable({
  providedIn: 'root'
})
export class ContactService {

  constructor(private http: HttpClient) { }

  getContacts():Observable<Contact[]>{
    let URL = "http://localhost:9090/api/contact/contacts";
    return this.http.get<Contact[]>(URL);
  }

  createContact(request: ContactCreationRequest):Observable<any>{
    const headers = { 'content-type': 'application/json'};
    const body = JSON.stringify(request);
    let URL = "http://localhost:9090/api/contact/create";
    return this.http.post(URL, request, {'headers':headers});
  }

  deleteContact(id: number):Observable<any>{
    let URL = "http://localhost:9090/api/contact/delete/" + id;
    return this.http.delete(URL);
  }

  updateContact(contactId: number, request: ContactCreationRequest):Observable<any>{
    const headers = { 'content-type': 'application/json'};
    const body = JSON.stringify(request);
    let URL = "http://localhost:9090/api/contact/update/" + contactId;
    return this.http.put(URL, request, {'headers': headers});
  }

  uploadPicture(event: any, contactId: number):Observable<any>{
    const file = event.target.files[0];
    const formData = new FormData();
    formData.append('file', file);
    let URL = "http://localhost:9090/api/contact/" + contactId + "/upload-picture";
    return this.http.post(URL, formData, { responseType: 'text' });
  }


}
