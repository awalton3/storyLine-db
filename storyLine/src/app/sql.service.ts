import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpParams, HttpHeaders, HttpEvent, HttpInterceptor, HttpHandler, HttpResponse } from '@angular/common/http';

import { Observable, throwError, Subject } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class SQLService {

  //SELECTED ONELINER
  selectedOneliner: string;

  baseUrl = 'http://db.cse.nd.edu:4201'
  onAddOneliner = new Subject<any>();
  onInsertStory = new Subject<any>();
  // onCloseStoriesDialog = new Subject<any>();

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

  selectStoryByOneLiner(oneLinerObj) {
    return this.http.put(`${this.baseUrl}/selectStoryByOneLiner.php`, oneLinerObj)
  }

  getMyStories() {
    return this.http.put(`${this.baseUrl}/selectStoryByUsername.php`, {'username':sessionStorage.getItem('username')})
  }

  getFriendStories() {
     return this.http.put(`${this.baseUrl}/selectFollowedStories.php`, {'username':sessionStorage.getItem('username')})
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

  getBookmarkedStories(username: string) {
    let body = { username: username }
    return this.http.post(this.baseUrl + "/selectAcctsBookmarkStoriesByAcct.php", body)
  }

  updateStoriesNumUpVotes(storyObj): any {
    return this.http.put(`${this.baseUrl}/updateStoriesNumUpVotes.php`, storyObj);
  }

  getLikedOneLiner(oneLiner) {
     return this.http.put(`${this.baseUrl}/selectAcctsLikeOneLinersByAcctAndOneLiner.php`, {'oneliner':oneLiner, 'username':sessionStorage.getItem('username')})
  }

  removeLikeOneLiner(likeObj) {
      return this.http.delete(`${this.baseUrl}/deleteAcctsLikeOneLiners.php/?oneliner=${likeObj['oneLiner']}&authorUsername=${likeObj['authorUsername']}`);
  }

  addLikeOneLiner(likeObj) {
      console.log(likeObj)
      return this.http.post(`${this.baseUrl}/insertAcctsLikeOneLiners.php`, likeObj);
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

  getFollowing(authorUsername) {
      return this.http.put(`${this.baseUrl}/verifyFollower.php`, {'followed':authorUsername, 'follower': sessionStorage.getItem('username')})
  }

  removeFollower(followObj) {
      return this.http.delete(`${this.baseUrl}/deleteFollowers.php/?followed=${followObj['followed']}&follower=${followObj['follower']}`);
  }

  addFollower(followObj) {
      return this.http.post(`${this.baseUrl}/insertFollowers.php`, followObj);
  }

}
