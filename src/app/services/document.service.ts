import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DocumentService {

  constructor(private http: HttpClient) { }

  createDocuments(documents: Document[]){
    let URL = "http://localhost:9090/api/document/create";
    const headers = { 'content-type': 'application/json'};
    const body = JSON.stringify(documents);
    return this.http.post(URL, documents, {'headers':headers});
  }

  




}
