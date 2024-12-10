import {Component, Input} from '@angular/core';
import {animate, keyframes, state, style, transition, trigger,} from '@angular/animations';
import {ThemeDeciderService} from '../../services/theme-decider.service';

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
                animate('0.5s', keyframes([style({ transform: 'translateY(-10%) scale(1.25)' })])),
                animate('0.5s', keyframes([style({ transform: 'translateY(-10%) scale(0.75)' })])),
            ]),
        ]),
    ],
  // eslint-disable-next-line @angular-eslint/prefer-standalone
  standalone: false
})
export class StatusLogoComponent {
  @Input()
  public seconds: string = '';
  @Input()
  public minutes: string = '';


  constructor(private themeDeciderService: ThemeDeciderService) {
  }

  public isDone(): boolean {
    return this.seconds === '00' && this.minutes === '00';
  }

  public isSecondsEven() {
    return +this.seconds % 2 == 0;
  }

  public finishIcon() {
    return this.themeDeciderService.appLogoFinished;
  }
}
