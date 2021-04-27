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
// import { AppContentComponent } from './app-content/app-content.component';
import { FriendFeedComponent } from './friend-feed/friend-feed.component';
import { AuthGuard } from './auth.guard';


const routes: Routes = [
  {
    path: '', component: AppComponent, children: [

      { path: '', redirectTo: 'login', pathMatch: 'full' },
      { path: 'login', component: LoginComponent },
      { path: 'register', component: RegisterComponent },
      // { path: 'app', component: AppContentComponent, canActivate: [AuthGuard] },
      { path: 'home', component: HomeComponent, canActivate: [AuthGuard] },
      { path: 'home/stories', component: StoriesComponent, canActivate: [AuthGuard] },
      { path: 'profile', component: ProfileComponent, canActivate: [AuthGuard] },
      { path: 'bookmarks', component: BookmarksComponent, canActivate: [AuthGuard] },
      { path: 'my-stories', component: MyStoriesComponent, canActivate: [AuthGuard] },
      { path: 'friend-feed', component: FriendFeedComponent, canActivate: [AuthGuard]},
      { path: '**', redirectTo: 'login', pathMatch: 'full' }

    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
