import { Component, OnInit } from '@angular/core';
import { MatBottomSheetRef } from '@angular/material/bottom-sheet';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { SQLService } from 'src/app/sql.service';

@Component({
  selector: 'app-submit-one-liner',
  templateUrl: './submit-one-liner.component.html',
  styleUrls: ['./submit-one-liner.component.css']
})
export class SubmitOneLinerComponent implements OnInit {

  oneLinerForm: FormGroup;

  constructor(private _bottomSheetRef: MatBottomSheetRef<SubmitOneLinerComponent>, private sql: SQLService) { }

  ngOnInit() {
    this.initForm();
  }

  initForm() {
    this.oneLinerForm = new FormGroup({
      'content': new FormControl(null, [Validators.required])
    });
  }

  // TODO :
  onSubmitForm() {
    this.sql.onUpdateOneliner.next(this.oneLinerForm.value.content);
  }

}
