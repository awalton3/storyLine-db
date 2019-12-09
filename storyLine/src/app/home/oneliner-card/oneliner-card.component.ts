import { Component, OnInit, Input, Output } from '@angular/core';
import { SQLService } from '../../sql.service';
import { Subscription } from 'rxjs';
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
  likeObj : any;

  constructor(private sql: SQLService) { }
  private subs: Subscription = new Subscription();

  ngOnInit() {
    this.getLiked()
  }

  getLiked() {
      this.subs.add(this.sql.getLikedOneLiner(this.oneLiner.oneLiner).subscribe(result => {
          if (result['liked']) {
              this.liked = 1
          }
          else {
              this.liked = 0
          }
    }));

  }

  onLike() {
    this.likeObj = {'oneLiner':this.oneLiner.oneLiner, 'authorUsername':sessionStorage.getItem('username')}
    if (this.liked == 0) {
      this.oneLiner.numUpVotes++
      this.liked = 1;
      this.subs.add(this.sql.addLikeOneLiner(this.likeObj).subscribe(result => {}));

    } else {
      this.oneLiner.numUpVotes--
      this.liked = 0;
      this.subs.add(this.sql.removeLikeOneLiner(this.likeObj).subscribe(result => {}));
    }
    this.onUpdateLike.next(this.liked);
  }

}
