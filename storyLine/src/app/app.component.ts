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
    this.sql.getOneLiners().subscribe(oneLiners => {
      console.log(oneLiners)
    })

    var oneLinerObj = JSON.parse('{ "oneLiner":"onelinergoeshere", "numViews":"0", "writtenAnon":"0", "timestamp":"2019-09-29 03:25:08", "authorUsername":"authorusernamegoeshere", "numUpVotes":"0" }');
    this.sql.insertOneLiner(oneLinerObj).subscribe(newOneLiner => {
      console.log("in app comp")
      console.log(newOneLiner)
    })

    var oneLinerToUpdate = JSON.parse('{"oneLiner":"onelinergoeshere"}');
    this.sql.updateOneLinerNumUpVotes(oneLinerToUpdate).subscribe(res => {
       console.log("oneliner updated!");
    })

   var oneLinerToDelete = JSON.parse('{"oneLiner":"onelinergoeshere"}');
   this.sql.deleteOneLiner(oneLinerToDelete).subscribe(res2 => {
      console.log("oneliner deleted!");
    })
  }

}
