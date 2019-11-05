import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { FormsMaterialComponentsModule } from './shared/forms-material-components.module';
import { MaterialComponentsModule } from './shared/material-components.module';
import { HttpClientModule } from '@angular/common/http';
import { MatCardModule } from '@angular/material/card';
import { MatBottomSheetModule } from '@angular/material/bottom-sheet';
import {DatePipe} from '@angular/common';

/* Child components */
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { OnelinerCardComponent } from './home/oneliner-card/oneliner-card.component';
import { SubmitOneLinerComponent } from './home/submit-one-liner/submit-one-liner.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    OnelinerCardComponent,
    SubmitOneLinerComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    FormsMaterialComponentsModule,
    MaterialComponentsModule,
    HttpClientModule,
    MatCardModule,
    MatBottomSheetModule
  ],
  providers: [DatePipe],
  bootstrap: [AppComponent],
  entryComponents: [SubmitOneLinerComponent]
})
export class AppModule { }
