import { Component, OnInit } from '@angular/core';
import { MatBottomSheetRef } from '@angular/material/bottom-sheet';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { DbService } from '../../db.service';

@Component({
  selector: 'app-submit-one-liner',
  templateUrl: './submit-one-liner.component.html',
  styleUrls: ['./submit-one-liner.component.css']
})
export class SubmitOneLinerComponent implements OnInit {

  oneLinerForm: FormGroup;

  constructor(private _bottomSheetRef: MatBottomSheetRef<SubmitOneLinerComponent>,
    private db: DbService, private datePipe: DatePipe) { }

  ngOnInit() {
    this.initForm();
  }

  initForm() {
    this.oneLinerForm = new FormGroup({
      'content': new FormControl(null)
    });
  }

  onSubmitForm() {
    const oneLinerObj = {
      content: this.oneLinerForm.value.content,
      timestamp: this.datePipe.transform(new Date(), 'yyyy-MM-dd HH:mm:ss')
    };
    this._bottomSheetRef.dismiss();
    this.db.onAddOneliner.next(oneLinerObj);
  }
}
