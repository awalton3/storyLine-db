import { Component, OnInit, Input, Output } from '@angular/core';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.css']
})
export class ToolbarComponent implements OnInit {

  @Input() content : any;
  @Output() onDismissDrawer = new Subject();

  constructor() { }

  ngOnInit() {
  }

  onDismiss() {
    console.log("time to say goodbye")
    this.onDismissDrawer.next()
  }

}
