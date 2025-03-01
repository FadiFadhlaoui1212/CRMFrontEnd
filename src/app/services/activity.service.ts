import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Activity } from '../models/activity';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ActivityService {

  constructor(private http: HttpClient) { }

  createActivity(activity: Activity):Observable<any>{
    let URL = "http://localhost:9090/api/activity/create";
    const headers = { 'content-type': 'application/json'};
    const body = JSON.stringify(activity);
    return this.http.post(URL, activity, {'headers':headers});
  }
}
