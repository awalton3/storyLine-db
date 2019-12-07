import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({ providedIn: 'root' })

export class SnackBarService {

  onOpenSnackBar = new Subject<{ message: string, isError: boolean }>();
  onCloseSnackBar = new Subject();

}
