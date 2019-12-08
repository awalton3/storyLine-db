import { Component, OnInit, Inject } from '@angular/core';
import { MatBottomSheetRef, MAT_BOTTOM_SHEET_DATA } from '@angular/material/bottom-sheet';
import { SQLService } from 'src/app/sql.service';
import { DatePipe } from '@angular/common';
import { FormGroup, FormControl } from '@angular/forms';
import { SnackBarService } from 'src/app/shared/snack-bar/snack-bar.service';

@Component({
  selector: 'app-submit-story',
  templateUrl: './submit-story.component.html',
  styleUrls: ['./submit-story.component.css']
})
export class SubmitStoryComponent implements OnInit {

  storySubmitForm = new FormGroup({
    'content': new FormControl(null)
  });
  placeholder = 'Alas, Dumplings!'

  constructor(
    private _bottomSheetRef: MatBottomSheetRef<SubmitStoryComponent>,
    private sql: SQLService,
    private snackBarService: SnackBarService,
    private datePipe: DatePipe,
    @Inject(MAT_BOTTOM_SHEET_DATA) public data: any) { }

  ngOnInit() {
    this.initForm();
  }

  initForm() {
    this.storySubmitForm = new FormGroup({
      'content': new FormControl(null)
    });
  }

  // ValidateStory() {
  //   if (!this.storySubmitForm.value.content)
  //     return { validStory: false }
  //
  //   if (this.storySubmitForm.value.content.includes(this.data.oneLiner)) {
  //     return { validStory: true }
  //   } else {
  //     return { validStory: false }
  //   }
  // }

  onSubmitForm() {

    if (!this.storySubmitForm.value.content.includes(this.data.oneLiner)) {
      this.snackBarService.onOpenSnackBar.next({ message: "You must include the oneliner in your story.", isError: true })
      return;
    }

    let storyObj = {
      content: this.storySubmitForm.value.content,
      oneLiner: this.data.oneLiner,
      requiresReview: 0,
      sensitiveContent: 0,
      numViews: 0,
      writtenAnon: 0,
      estReadTime: (this.storySubmitForm.value.content.length) / 20,
      timestamp: this.datePipe.transform(new Date, 'yyyy-MM-dd HH:mm:ss'),
      authorUsername: sessionStorage.getItem('username'),
      numUpVotes: 0
    }

    this._bottomSheetRef.dismiss()
    this.sql.insertStory(storyObj).subscribe(res => {
      this.sql.onInsertStory.next(storyObj);
      this.snackBarService.onOpenSnackBar.next({ message: "Your story was successfully published", isError: false })
    }, error => {
      if (error.statusText === 'Created')
        this.snackBarService.onOpenSnackBar.next({ message: "Plagiarism!", isError: true })
    })
  }

  // checkPlaceHolder() {
  //   if (this.placeholder) {
  //     this.placeholder = null;
  //     return;
  //   } else {
  //     this.placeholder = 'Alas, Dumplings';
  //     return;
  //   }
  // }

}
