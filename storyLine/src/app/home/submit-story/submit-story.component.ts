import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { MatBottomSheetRef } from '@angular/material/bottom-sheet';
import { SQLService } from 'src/app/sql.service';
import { DatePipe } from '@angular/common';
import { FormGroup, FormControl } from '@angular/forms';
import { SnackBarService } from 'src/app/shared/snack-bar/snack-bar.service';

@Component({
  selector: 'app-submit-story',
  templateUrl: './submit-story.component.html',
  styleUrls: ['./submit-story.component.css']
})
export class SubmitStoryComponent implements OnInit, AfterViewInit {

  @ViewChild('submitType', { static: false }) submitType: { selected: { value: string; }; };

  storySubmitForm = new FormGroup({
    'content': new FormControl(null)
  });
  placeholder = 'Alas, Dumplings!'
  username = '';

  constructor(
    private _bottomSheetRef: MatBottomSheetRef<SubmitStoryComponent>,
    private sql: SQLService,
    private snackBarService: SnackBarService,
    private datePipe: DatePipe) { }

  ngOnInit() {
    this.initForm();
    this.username = sessionStorage.getItem('username')
  }

  ngAfterViewInit() {
    // this.submitType.selected.value = this.username;
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

    let writtenAnon = this.submitType.selected.value == 'anonymous' ? true : false;

    // if (!this.storySubmitForm.value.content.includes(this.sql.selectedOneliner)) {
    //   this.snackBarService.onOpenSnackBar.next({ message: "You must include the oneliner in your story.", isError: true })
    //   return;
    // }

    let storyObj = {
      content: this.storySubmitForm.value.content,
      oneLiner: sessionStorage.getItem('oneLiner'),
      writtenAnon: writtenAnon,
      estReadTime: (this.storySubmitForm.value.content.length)/20,
      timestamp: this.datePipe.transform(new Date, 'yyyy-MM-dd HH:mm:ss'),
      authorUsername: sessionStorage.getItem('username'),
      numUpVotes: 0
    }

    this.sql.insertStory(storyObj).subscribe(res => {

      this.snackBarService.onOpenSnackBar.next({ message: "Your story was successfully published", isError: false })
      // setTimeout(function(){ }, 4000);
      this._bottomSheetRef.dismiss()
      this.sql.onInsertStory.next(storyObj);

    }, error => {
      if (error.statusText === 'Created')
        this.snackBarService.onOpenSnackBar.next({ message: "Plagiarism!", isError: true })
    })
  }


}
