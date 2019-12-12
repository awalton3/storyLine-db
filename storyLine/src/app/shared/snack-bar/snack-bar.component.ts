import { Component, OnInit, Inject } from '@angular/core';
import { MAT_SNACK_BAR_DATA } from '@angular/material/snack-bar';
import { SnackBarService } from './snack-bar.service';

@Component({
  selector: 'app-snack-bar',
  templateUrl: './snack-bar.component.html',
  styleUrls: ['./snack-bar.component.css']
})
export class SnackBarComponent implements OnInit {

  constructor(
    @Inject(MAT_SNACK_BAR_DATA) public data: { message: string, isError: boolean },
    private snackBarService: SnackBarService
  ) {}

  ngOnInit() {
  }

  onSnackBarClose() {
    this.snackBarService.onCloseSnackBar.next();
  }

}
