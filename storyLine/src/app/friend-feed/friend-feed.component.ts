import { Component, OnInit } from '@angular/core';
import { SQLService } from '../sql.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-friend-feed',
  templateUrl: './friend-feed.component.html',
  styleUrls: ['./friend-feed.component.css']
})
export class FriendFeedComponent implements OnInit {

  constructor(private sql: SQLService) { }
  private subs: Subscription = new Subscription();
  selectedStories: any;

  ngOnInit() {
      this.selectedStories = [];
      this.loadFriendStories()
  }

  loadFriendStories() {
    this.subs.add(this.sql.getFriendStories().subscribe(selectedStories => {
      this.selectedStories = selectedStories
    }));
  }

}
