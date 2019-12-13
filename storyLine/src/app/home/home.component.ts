import { Component, OnInit, OnDestroy } from '@angular/core';
import { SQLService } from '../sql.service';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { SubmitOneLinerComponent } from './submit-one-liner/submit-one-liner.component';
import { Subscription } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { StoriesSsComponent } from './stories-ss/stories-ss.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

export class HomeComponent implements OnInit, OnDestroy {

  oneLiners: any;
  selectedStories: any;
  selectedOneliner: string;
  storiesExist: number = 0;
  private subs: Subscription = new Subscription();

  constructor(
    private sql: SQLService,
    private _bottomSheet: MatBottomSheet,
    public dialog: MatDialog) { }

  ngOnInit() {

    this.getOneLiners();
    this.listenForOneLiners();
    this.listenForStories();
    // this.toolbarContent = null;

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
      this.sql.dialogueRef.close();
      this.fetchStories(storyObj)
    }))
  }

  updateLike(liked, oneLiner) {
    console.log(liked);
    oneLiner = { "oneLiner": oneLiner, "change": liked }
    this.sql.updateOneLinerNumUpVotes(oneLiner).subscribe(res => {
      //this.getOneLiners();
    }, error => console.log(error))
  }

  onSubmitOneliner() {
    this._bottomSheet.open(SubmitOneLinerComponent);
  }

  // onAddStory() {
  //   this._bottomSheet.open(SubmitStoryComponent, {
  //     data: {
  //       oneLiner: this.selectedOneliner
  //     }
  //   });
  // }

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

  fetchStories(oneLinerObj) {
    this.subs.add(this.sql.selectStoryByOneLiner(oneLinerObj).subscribe(res => {
      this.selectedStories = res;
<<<<<<< HEAD

      let stories = res;
      this.openStoriesView(stories, oneLinerObj.oneLiner);

      if (res[0]['exist'] == 1) {
        this.storiesExist = 1;
=======
      if (res[0]['exist'] == 1) {
          this.storiesExist = 1;
>>>>>>> a379dd0edf13f0f97c9ec53c4f1910ee5e319330
      }
      this.selectedOneliner = oneLinerObj.oneLiner
      this.sql.selectedOneliner = oneLinerObj.oneLiner;
    }))
  }

  openStoriesView(stories: any, oneLiner: string) {
    this.dialog.open(StoriesSsComponent, {
      width: '100vw',
      maxWidth: '100vw',
      height: '100vh',
      panelClass: 'storiesViewerContainer',
      data: { stories:  stories, oneLiner: oneLiner}
    });
  }

  ngOnDestroy() {
    this.subs.unsubscribe();
  }
}
