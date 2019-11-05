import { Component, OnInit, OnDestroy } from '@angular/core';
import { SQLService } from '../sql.service';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { SubmitOneLinerComponent } from './submit-one-liner/submit-one-liner.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

export class HomeComponent implements OnInit, OnDestroy{
  oneLiners : any;
  constructor(private sql : SQLService, private _bottomSheet: MatBottomSheet) { }

  ngOnInit() {
    this.sql.getOneLiners().subscribe(oneLiners => {
       console.log(oneLiners[0].oneLiner)
       this.oneLiners = oneLiners
     })
     this.listenForOneLiners();
  }

  listenForOneLiners() {
    this.sql.onUpdateOneliner.subscribe(newOneLiner => {
      console.log(newOneLiner)
    })
  }

  updateLike(oneLiner) {
    console.log("hello");
    oneLiner = {"oneLiner": oneLiner}
    this.sql.updateOneLinerNumUpVotes(oneLiner).subscribe(res => {


    }, error => {
      console.log(error)
    })

  }

  onSubmitOneliner() {
    this._bottomSheet.open(SubmitOneLinerComponent);
  }

  ngOnDestroy() {
  }

}
