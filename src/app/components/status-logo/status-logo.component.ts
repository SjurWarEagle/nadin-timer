import { Component, Input, OnInit } from '@angular/core';
import {
  animate,
  keyframes,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';

@Component({
  selector: 'app-status-logo',
  templateUrl: './status-logo.component.html',
  styleUrls: ['./status-logo.component.scss'],
  animations: [
    trigger('secondsUpdated', [
      // ...
      state(
        'uneven',
        style({
          // transform: 'rotate(180deg)'
        })
      ),
      state(
        'even',
        style({
          // transform: 'rotate(360deg)'
        })
      ),
      transition('* => *', [
        animate('0.2s', keyframes([style({ transform: 'scale(1.05)' })])),
        animate('0.2s', keyframes([style({ transform: 'scale(1)' })])),
      ]),
      // transition('uneven => even', [
      //   animate('0.2s')
      // ]),
      // transition('even => uneven', [
      //   animate('0.2s')
      // ]),
    ]),
  ],
})
export class StatusLogoComponent implements OnInit {
  @Input()
  public seconds: string;
  @Input()
  public minutes: string;

  constructor() {}

  ngOnInit(): void {}

  public isSecondsEven() {
    return +this.seconds % 2;
  }
}
