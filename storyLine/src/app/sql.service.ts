import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpParams, HttpHeaders, HttpEvent, HttpInterceptor, HttpHandler, HttpResponse } from '@angular/common/http';

import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class SQLService {
  baseUrl = 'http://db.cse.nd.edu:4201'
  constructor(private http: HttpClient) { }

  getOneLiners(): any {
    return this.http.get(`${this.baseUrl}/readAllOneLiners.php`);
  }

  insertOneLiner(oneLinerObj): any {
    return this.http.post(`${this.baseUrl}/insertOneLiner.php`, oneLinerObj, {responseType: 'text'});
  }

  updateOneLinerNumUpVotes(oneLinerObj): any {
    return this.http.put(`${this.baseUrl}/updateOneLinerNumUpVotes.php`, oneLinerObj, {responseType: 'text'});
  }

  deleteOneLiner(oneLinerObj): any {
    return this.http.delete(`${this.baseUrl}/deleteOneLiner.php/?oneLiner=${oneLinerObj['oneLiner']}`, {responseType: 'text'});
  }

}
