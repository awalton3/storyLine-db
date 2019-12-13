import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { SubmitStoryComponent } from '../submit-story/submit-story.component';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { SQLService } from 'src/app/sql.service';

@Component({
  selector: 'app-stories-ss',
  templateUrl: './stories-ss.component.html',
  styleUrls: ['./stories-ss.component.css']
})
export class StoriesSsComponent implements OnInit {

  toolbarContent: string;


  constructor(
    public dialogRef: MatDialogRef<StoriesSsComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { stories: any, oneLiner: string },
    private _bottomSheet: MatBottomSheet,
    private sql: SQLService
  ) { }

  ngOnInit() {
    console.log(this.data.stories)
    this.toolbarContent = this.data.oneLiner;
  }

  onAddStory() {
    this._bottomSheet.open(SubmitStoryComponent);
  }

}
