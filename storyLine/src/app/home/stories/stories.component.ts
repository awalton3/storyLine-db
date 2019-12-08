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

  constructor(private sql: SQLService) { }
  private subs: Subscription = new Subscription();

  ngOnInit() {
    this.getBookmarked()
  }

  onBookmark() {
    this.bookmarkObj = {'storyHashID':this.story.storyHashID, 'authorUsername':sessionStorage.getItem('username')}
    console.log(this.bookmarked);
    if (this.bookmarked) {
      this.bookmarked = 0;
      console.log('unbookmarked');
      this.subs.add(this.sql.removeBookmark(this.bookmarkObj).subscribe(result => {}));
    }
    else {
      console.log('bookmarked');
      this.bookmarked = 1;
      this.subs.add(this.sql.addBookmark(this.bookmarkObj).subscribe(result => {}));
    }
  }

  getBookmarked() {
    console.log(this.sql.getBookmarked(this.story.storyHashID));
    this.subs.add(this.sql.getBookmarked(this.story.storyHashID).subscribe(result => {
      if (result['bookmarked']) {
        this.bookmarked = 1
      }
      else {
        this.bookmarked = 0
      }
    }));
  }

}
