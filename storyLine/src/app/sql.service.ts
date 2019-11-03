import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpParams, HttpHeaders } from '@angular/common/http';

import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class SQLService {
  baseUrl = 'http://db.cse.nd.edu:4201'
  constructor(private http: HttpClient) { }

  getStories(): any {
    return this.http.get(`${this.baseUrl}/read.php`, {responseType: 'text'});
  }
}
