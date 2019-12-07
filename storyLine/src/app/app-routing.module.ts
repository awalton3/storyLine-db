import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { StoriesComponent } from './home/stories/stories.component';
import { RegisterComponent } from './register/register.component';


const routes: Routes = [
  {
    path: '', component: AppComponent, children: [

      { path: '', redirectTo: 'login', pathMatch: 'full' },
      { path: 'login', component: LoginComponent },
      { path: 'register', component: RegisterComponent }, 
      { path: 'home', component: HomeComponent },
      { path: 'home/stories', component: StoriesComponent },
      { path: '**', redirectTo: 'login', pathMatch: 'full' }

    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
