import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Contact } from 'src/app/models/contact';
import { ContactCreationRequest } from 'src/app/models/contactCreationRequest';

@Injectable({
  providedIn: 'root'
})
export class ContactService  {


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

  deleteContacts(ids: number[]):Observable<any>{
    const headers = { 'content-type': 'application/json'};
    const body = JSON.stringify(ids);
    let URL = "http://localhost:9090/api/contact/delete";
    return this.http.request('DELETE', URL, {headers, body});
  }

  updateContact(contactId: number, request: ContactCreationRequest):Observable<any>{
    const headers = { 'content-type': 'application/json'};
    const body = JSON.stringify(request);
    let URL = "http://localhost:9090/api/contact/update/" + contactId;
    console.log("here is the URL", URL);
    return this.http.put(URL, request, {'headers': headers});
  }

  uploadPicture(contactId: number, formData: FormData):Observable<any>{
    let URL = "http://localhost:9090/api/contact/" + contactId + "/upload-picture";
    return this.http.post(URL, formData, { responseType: 'text' });
  }

  getProfilePicture(contactId: number): Observable<Blob> {
    let URL = `http://localhost:9090/api/contact/${contactId}/get-picture`;
    return this.http.get(URL, { responseType: 'blob' }); // 👈 Expect binary data (image)
    }


}
