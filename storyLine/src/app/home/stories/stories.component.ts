import { Component, OnInit, Input } from '@angular/core';
import { SQLService } from '../../sql.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-stories',
  templateUrl: './stories.component.html',
  styleUrls: ['./stories.component.css']
})
export class StoriesComponent implements OnInit {

  @Input() story : any;
  bookmarked : number;
  bookmarkObj : any;
  justLiked : number = 0;
  liked : number;
  likeObj : any;
  following : number;
  followObj: any;
  me: number = 0;

  constructor(private sql: SQLService) { }
  private subs: Subscription = new Subscription();

  ngOnInit() {
    this.getBookmarked()
    this.getLiked()
    this.getFollowing()
  }

  getBookmarked() {
    //console.log(this.sql.getBookmarked(this.story.storyHashID));
    this.subs.add(this.sql.getBookmarked(this.story.storyHashID).subscribe(result => {
      if (result['bookmarked']) {
        this.bookmarked = 1
      }
      else {
        this.bookmarked = 0
      }
    }));
  }

  onBookmark() {
    this.bookmarkObj = {'storyHashID':this.story.storyHashID, 'authorUsername':sessionStorage.getItem('username')}
    //console.log(this.bookmarked);
    if (this.bookmarked) {
      this.bookmarked = 0;
      //console.log('just unbookmarked');
      this.subs.add(this.sql.removeBookmark(this.bookmarkObj).subscribe(result => {}));
    }
    else {
      //console.log('just bookmarked');
      this.bookmarked = 1;
      this.subs.add(this.sql.addBookmark(this.bookmarkObj).subscribe(result => {}));
    }
  }

  getLiked() {
      console.log('in get liked')
      console.log(this.sql.getLiked(this.story.storyHashID))
      this.subs.add(this.sql.getLiked(this.story.storyHashID).subscribe(result => {
          if (result['liked']) {
              //console.log("I am liked!\n")
              this.liked = 1
          }
          else {
              //console.log("I am not liked!\n")
              this.liked = 0
          }
    }));
   }


  onLike() {
      this.likeObj = {'storyHashID':this.story.storyHashID, 'authorUsername':sessionStorage.getItem('username')}
      console.log(this.liked);
      if (this.liked) {
        this.liked = 0;
        this.justLiked = 0;
        this.subs.add(this.sql.removeLike(this.likeObj).subscribe(result => {}));
        this.story['change'] = 0;
        this.subs.add(this.sql.updateStoriesNumUpVotes(this.story).subscribe(result => {}));
      }
      else {
        this.liked = 1;
        this.justLiked = 1; // Keeps track of if the user just added a like
        this.subs.add(this.sql.addLike(this.likeObj).subscribe(result => {}));
        this.story['change'] = 1;
        this.subs.add(this.sql.updateStoriesNumUpVotes(this.story).subscribe(result => {}));
      }
    }

    getFollowing() {
        if (this.story.authorUsername == sessionStorage.getItem('username')) {
            this.me = 1;
        }
        this.subs.add(this.sql.getFollowing(this.story.authorUsername).subscribe(result => {
          // console.log(result['following'])
          if (result['following']) {
            this.following = 1
          }
          else {
            this.following = 0
          }
        }));
    }

    onFollow() {
        this.followObj = {'followed':this.story.authorUsername, 'follower':sessionStorage.getItem('username')}

        if (this.following) {
          this.following = 0;
          this.subs.add(this.sql.removeFollower(this.followObj).subscribe(result => {}));
        }
        else {
          this.following = 1;
          this.subs.add(this.sql.addFollower(this.followObj).subscribe(result => {}));
        }
    }

}
