import { Component, OnInit } from '@angular/core';
import { MatBottomSheetRef } from '@angular/material/bottom-sheet';

@Component({
  selector: 'app-submit-story',
  templateUrl: './submit-story.component.html',
  styleUrls: ['./submit-story.component.css']
})
export class SubmitStoryComponent implements OnInit {

  constructor(private _bottomSheetRef: MatBottomSheetRef<SubmitStoryComponent>) { }

  ngOnInit() {
    
  }

}
