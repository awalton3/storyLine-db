import { Component, OnInit } from '@angular/core';
import { SQLService } from '../sql.service';

@Component({
  selector: 'app-bookmarks',
  templateUrl: './bookmarks.component.html',
  styleUrls: ['./bookmarks.component.css']
})
export class BookmarksComponent implements OnInit {

  selectedStories: any;

  constructor(private sql: SQLService) { }

  ngOnInit() {
    this.selectedStories = [];
    this.loadBookmarkedStories();
  }


  loadBookmarkedStories() {
    this.sql.getBookmarkedStories(sessionStorage.getItem('username'))
      .subscribe(bookmarkedStories => {
        this.selectedStories = bookmarkedStories;
        console.log(this.selectedStories)
      })
  }

}
