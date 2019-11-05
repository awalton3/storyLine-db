import { Component, OnInit, Input, Output } from '@angular/core';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-oneliner-card',
  templateUrl: './oneliner-card.component.html',
  styleUrls: ['./oneliner-card.component.css']
})
export class OnelinerCardComponent implements OnInit {

  @Input() oneLiner : any;
  @Output() onUpdateLike = new Subject();
  @Output() onDeleteOneLiner = new Subject();
  username = sessionStorage.getItem('username');

  constructor() { }

  ngOnInit() {
    console.log(this.oneLiner);
  }

  onLike() {
    this.onUpdateLike.next();
  }

  onDelete() {
    this.onDeleteOneLiner.next();
  }

}
