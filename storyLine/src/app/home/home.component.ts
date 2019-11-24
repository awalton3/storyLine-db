import { Component, OnInit, OnDestroy } from '@angular/core';
import { SQLService } from '../sql.service';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { SubmitOneLinerComponent } from './submit-one-liner/submit-one-liner.component';
import { Subscription } from 'rxjs';
import { MatToolbarModule } from '@angular/material/toolbar';
import { SubmitStoryComponent } from './submit-story/submit-story.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

export class HomeComponent implements OnInit, OnDestroy {

  oneLiners: any;
  selectedStories: any;
  selectedOneliner: string;

  constructor(private sql: SQLService, private _bottomSheet: MatBottomSheet, private _toolbar: MatToolbarModule) { }
  private subs: Subscription = new Subscription();

  ngOnInit() {
    this.getOneLiners();
    this.listenForOneLiners();
    this.listenForStories();
  }

  getOneLiners() {
    this.subs.add(this.sql.getOneLiners().subscribe(oneLiners => {
      this.oneLiners = oneLiners
    }));
  }

  listenForOneLiners() {
    this.subs.add(this.sql.onAddOneliner.subscribe(newOneLinerObj => {
      this.addOneLiner(newOneLinerObj)
    }))
  }

  listenForStories() {
    this.subs.add(this.sql.onInsertStory.subscribe(storyObj => {
      console.log(storyObj)
      this.fetchStories(storyObj)
    }))
  }

  updateLike(liked, oneLiner) {
    console.log(liked);
    oneLiner = { "oneLiner": oneLiner , "change": liked}
    this.sql.updateOneLinerNumUpVotes(oneLiner).subscribe(res => {
      //this.getOneLiners();
    }, error => console.log(error))
  }

  onSubmitOneliner() {
    this._bottomSheet.open(SubmitOneLinerComponent);
  }

  onAddStory() {
    console.log("onAddStory was clicked")
    this._bottomSheet.open(SubmitStoryComponent, {
      data : {
        oneLiner: this.selectedOneliner
      }
    });
  }

  addOneLiner(newOneLiner) {
    newOneLiner = {
      "oneLiner": newOneLiner.content,
      "numViews": 0,
      "writtenAnon": 0,
      "timestamp": newOneLiner.timestamp,
      "authorUsername": sessionStorage.getItem('username'),
      "numUpVotes": 0
    }
    this.sql.insertOneLiner(newOneLiner).subscribe(res => {
      this.getOneLiners();
    }, error => console.log(error))
  }

  deleteOneLiner(oldOneLiner) {
    this.subs.add(this.sql.deleteOneLiner({ "oneLiner": oldOneLiner }).subscribe(res => {
      this.getOneLiners();
    }, error => console.log(error)))
  }

  fetchStories(oneLinerObj) {
    this.subs.add(this.sql.selectStoryByOneLiner(oneLinerObj).subscribe(res => {
      this.selectedStories = res;
      this.selectedOneliner = oneLinerObj.oneLiner
      window.scrollTo(0,0)
    }))
  }

  ngOnDestroy() {
    this.subs.unsubscribe();
  }

}
