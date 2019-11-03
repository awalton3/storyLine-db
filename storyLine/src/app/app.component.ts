import { Component } from '@angular/core';
import { SQLService } from './sql.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  constructor(private sql: SQLService) {
  }

  ngOnInit() {
    this.sql.getStories().subscribe(stories => {
      console.log(stories)
    })
  }

}
