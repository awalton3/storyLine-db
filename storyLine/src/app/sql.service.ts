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

  getMyStories() {
    return this.http.put(`${this.baseUrl}/selectStoryByUsername.php`, {'username':sessionStorage.getItem('username')})
  }

  getBookmarked(storyHashID) {
    console.log('in getBookmarked');
    return this.http.put(`${this.baseUrl}/selectAcctsBookmarkStoriesByAcctAndHashID.php`, {'storyHashID':storyHashID, 'username':sessionStorage.getItem('username')})
  }

  removeBookmark(bookmarkObj) {
    console.log('in removebookmark');
    // return this.http.delete(`${this.baseUrl}/deleteAcctsBookmarkStories.php/?storyHashID=${bookmarkObj['storyHashID']}${bookmarkObj['authorUsername']}`);
    return this.http.delete(`${this.baseUrl}/deleteAcctsBookmarkStories.php/?storyHashID=${bookmarkObj['storyHashID']}&authorUsername=${bookmarkObj['authorUsername']}`);
  }

  addBookmark(bookmarkObj) {
    console.log('in addbookmark');
    return this.http.post(`${this.baseUrl}/insertAcctsBookmarkStories.php`, bookmarkObj);
  }

  updateStoriesNumUpVotes(storyObj): any {
    return this.http.put(`${this.baseUrl}/updateStoriesNumUpVotes.php`, storyObj);
  }

  getLiked(storyHashID) {
      return this.http.put(`${this.baseUrl}/selectAcctsLikeStoriesByAcctAndHashID.php`, {'storyHashID':storyHashID, 'username':sessionStorage.getItem('username')})
  }

  removeLike(likeObj) {
      return this.http.delete(`${this.baseUrl}/deleteAcctsLikeStories.php/?storyHashID=${likeObj['storyHashID']}&authorUsername=${likeObj['authorUsername']}`);
  }

  addLike(likeObj) {
      return this.http.post(`${this.baseUrl}/insertAcctsLikeStories.php`, likeObj);
  }

}
