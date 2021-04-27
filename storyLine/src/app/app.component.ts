import { Component } from '@angular/core';
import { SnackBarService } from './shared/snack-bar/snack-bar.service';
import { SnackBarComponent } from './shared/snack-bar/snack-bar.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  private subs = new Subscription();

  constructor(
    private snackBarService: SnackBarService,
    private snackBar: MatSnackBar) {}

  ngOnInit() {
    this.listenForSnackBarOpen();
    this.listenForSnackBarClose();
  }

  listenForSnackBarOpen() {
    this.subs.add(this.snackBarService.onOpenSnackBar.subscribe(data =>
      this.openSnackbar({ message: data.message, isError: data.isError })));
  }

  listenForSnackBarClose() {
    this.subs.add(this.snackBarService.onCloseSnackBar.subscribe(() => this.snackBar.dismiss()));
  }

  openSnackbar(data: any) {
    this.snackBar.openFromComponent(SnackBarComponent, {
      duration: 4000,
      verticalPosition: 'top',
      horizontalPosition: 'right',
      data: data
    })
  }

  ngOnDestroy() {
    this.subs.unsubscribe();
  }

}
