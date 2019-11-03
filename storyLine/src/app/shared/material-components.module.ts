import { NgModule } from '@angular/core';
import { MatDividerModule } from '@angular/material/divider';
import { FlexLayoutModule } from "@angular/flex-layout";
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatRippleModule } from '@angular/material/core';

@NgModule({
  imports: [
    FlexLayoutModule,
    MatButtonModule,
    MatDividerModule,
    MatRippleModule,
    MatSnackBarModule
  ],
  exports: [
    FlexLayoutModule,
    MatButtonModule,
    MatDividerModule,
    MatRippleModule,
    MatSnackBarModule
  ]
})

export class MaterialComponentsModule { }
