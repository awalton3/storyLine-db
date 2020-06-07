import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { SQLService } from '../sql.service';

@Component({
  selector: 'app-my-stories',
  templateUrl: './my-stories.component.html',
  styleUrls: ['./my-stories.component.css']
})
export class MyStoriesComponent implements OnInit {

  selectedStories: any;

  constructor(private sql: SQLService) { }
  private subs: Subscription = new Subscription();

  ngOnInit() {
    this.loadMyStories();
  }

  loadMyStories() {
    this.subs.add(this.sql.getMyStories().subscribe(selectedStories => {
      this.selectedStories = selectedStories
    }));
  }

}
