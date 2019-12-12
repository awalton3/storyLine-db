import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SnackBarComponent } from './snack-bar.component';
import { MaterialComponentsModule } from '../material-components.module';

@NgModule({
  declarations: [SnackBarComponent],
  imports: [
    CommonModule,
    MaterialComponentsModule
  ],
  entryComponents: [SnackBarComponent]
})
export class SnackBarModule {}
