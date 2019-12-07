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
import { DatePipe } from '@angular/common';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatButtonModule } from '@angular/material/button';
import { MatListModule } from '@angular/material/list';

/* Child components */
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { OnelinerCardComponent } from './home/oneliner-card/oneliner-card.component';
import { SubmitOneLinerComponent } from './home/submit-one-liner/submit-one-liner.component';
import { StoriesComponent } from './home/stories/stories.component';
import { SubmitStoryComponent } from './home/submit-story/submit-story.component';
import { ToolbarComponent } from './home/toolbar/toolbar.component';
import { RegisterComponent } from './register/register.component';
import { SnackBarModule } from './shared/snack-bar/snack-bar.module';
import { ProfileComponent } from './profile/profile.component';
import { BookmarksComponent } from './bookmarks/bookmarks.component';
import { MyStoriesComponent } from './my-stories/my-stories.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    OnelinerCardComponent,
    SubmitOneLinerComponent,
    StoriesComponent,
    SubmitStoryComponent,
    ToolbarComponent,
    RegisterComponent,
    ProfileComponent,
    BookmarksComponent,
    MyStoriesComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    FormsMaterialComponentsModule,
    MaterialComponentsModule,
    HttpClientModule,
    MatCardModule,
    MatBottomSheetModule,
    MatToolbarModule,
    MatGridListModule,
    MatSidenavModule,
    SnackBarModule,
    MatButtonModule,
    MatListModule
  ],
  providers: [DatePipe],
  bootstrap: [AppComponent],
  entryComponents: [SubmitOneLinerComponent, SubmitStoryComponent]
})
export class AppModule { }
