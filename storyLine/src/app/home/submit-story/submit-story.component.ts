import { Component, OnInit, Inject } from '@angular/core';
import { MatBottomSheetRef, MAT_BOTTOM_SHEET_DATA } from '@angular/material/bottom-sheet';
import { SQLService } from 'src/app/sql.service';
import { DatePipe } from '@angular/common';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';

@Component({
  selector: 'app-submit-story',
  templateUrl: './submit-story.component.html',
  styleUrls: ['./submit-story.component.css']
})
export class SubmitStoryComponent implements OnInit {

  storySubmitForm: FormGroup;

  constructor(private _bottomSheetRef: MatBottomSheetRef<SubmitStoryComponent>,
    private sql: SQLService, private datePipe: DatePipe,
    @Inject(MAT_BOTTOM_SHEET_DATA) public data: any) { }

  ngOnInit() {
    this.initForm();
  }

  initForm() {
    this.storySubmitForm = new FormGroup({
      'content': new FormControl(null)
    });
  }

  onSubmitForm() {
    let storyObj = {
      content: this.storySubmitForm.value.content,
      oneLiner: this.data.oneLiner,
      writtenAnon: 0,
      estReadTime: (this.storySubmitForm.value.content.length)/20,
      timestamp: this.datePipe.transform(new Date, 'yyyy-MM-dd HH:mm:ss'),
      authorUsername: sessionStorage.getItem('username'),
      numUpVotes: 0
    }

    this._bottomSheetRef.dismiss()
    this.sql.insertStory(storyObj).subscribe(res => {
      this.sql.onInsertStory.next(storyObj);
    })
  }

}
