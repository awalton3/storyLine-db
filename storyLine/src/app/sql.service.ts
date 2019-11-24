import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpParams, HttpHeaders, HttpEvent, HttpInterceptor, HttpHandler, HttpResponse } from '@angular/common/http';

import { Observable, throwError, Subject } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class SQLService {

  baseUrl = 'http://db.cse.nd.edu:4201'
  onAddOneliner = new Subject<any>();
  onInsertStory = new Subject<any>();

  constructor(private http: HttpClient) { }

  getOneLiners(): any {
    return this.http.get(`${this.baseUrl}/readAllOneLiners.php`);
  }

  insertOneLiner(oneLinerObj): any {
    console.log('In insertOneLiner');
    return this.http.post(`${this.baseUrl}/insertOneLiner.php`, oneLinerObj);
  }

  insertStory(storyObj): any {
    return this.http.post(`${this.baseUrl}/insertStory.php`, storyObj);
  }

  updateOneLinerNumUpVotes(oneLinerObj): any {
    return this.http.put(`${this.baseUrl}/updateOneLinerNumUpVotes.php`, oneLinerObj);
  }

  deleteOneLiner(oneLinerObj): any {
    return this.http.delete(`${this.baseUrl}/deleteOneLiner.php/?oneLiner=${oneLinerObj['oneLiner']}`);
  }

  selectStoryByOneLiner(oneLinerObj) {
    return this.http.put(`${this.baseUrl}/selectStoryByOneLiner.php`, oneLinerObj)
  }

}
