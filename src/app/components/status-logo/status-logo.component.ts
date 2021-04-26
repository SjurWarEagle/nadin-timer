import { Component, Input } from '@angular/core';
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
      state('uneven', style({})),
      state('even', style({})),
      transition('* => *', [
        animate('0.2s', keyframes([style({ transform: 'scale(1.05)' })])),
        animate('0.2s', keyframes([style({ transform: 'scale(1)' })])),
      ]),
    ]),
  ],
})
export class StatusLogoComponent {
  @Input()
  public seconds: string;
  @Input()
  public minutes: string;

  public isDone(): boolean {
    return this.seconds == '00' && this.minutes == '00';
  }

  public isSecondsEven() {
    return +this.seconds % 2;
  }
}
