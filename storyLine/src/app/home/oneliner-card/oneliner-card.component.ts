import { Component, OnInit, Input, Output } from '@angular/core';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-oneliner-card',
  templateUrl: './oneliner-card.component.html',
  styleUrls: ['./oneliner-card.component.css']
})
export class OnelinerCardComponent implements OnInit {

  @Input() oneLiner : any;
  @Output() onUpdateLike = new Subject<Number>();
  @Output() onDeleteOneLiner = new Subject();
  @Output() onSelect = new Subject(); 
  username = sessionStorage.getItem('username');
  liked = 0;

  constructor() { }

  ngOnInit() {
    console.log(this.liked)
    // console.log(this.oneLiner);
  }

  onLike() {
    if (this.liked == 0) {
      this.oneLiner.numUpVotes++
      this.liked = 1;
    } else {
      this.oneLiner.numUpVotes--
      this.liked = 0;
    }
    this.onUpdateLike.next(this.liked);
  }

  onDelete() {
    this.onDeleteOneLiner.next();
  }

}
