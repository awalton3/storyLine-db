import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { StoriesComponent } from './home/stories/stories.component';
import { RegisterComponent } from './register/register.component';
import { ProfileComponent } from './profile/profile.component';
import { BookmarksComponent } from './bookmarks/bookmarks.component';
import { MyStoriesComponent } from './my-stories/my-stories.component';
import { AppContentComponent } from './app-content/app-content.component';


const routes: Routes = [
  {
    path: '', component: AppComponent, children: [

      { path: '', redirectTo: 'login', pathMatch: 'full' },
      { path: 'login', component: LoginComponent },
      { path: 'register', component: RegisterComponent },
      { path: 'app', component: AppContentComponent },
      { path: 'home', component: HomeComponent },
      { path: 'home/stories', component: StoriesComponent },
      { path: 'profile', component: ProfileComponent },
      { path: 'bookmarks', component: BookmarksComponent },
      { path: 'my-stories', component: MyStoriesComponent },
      { path: '**', redirectTo: 'login', pathMatch: 'full' }

    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
