import { OnDestroy, Component, OnInit } from '@angular/core';
import * as _ from 'lodash';
import { Subscription } from 'rxjs/internal/Subscription';
import {
  animate,
  keyframes,
  style,
  transition,
  trigger,
} from '@angular/animations';

@Component({
  selector: 'app-fake-status',
  templateUrl: './fake-status.component.html',
  styleUrls: ['./fake-status.component.scss'],
  animations: [
    trigger('updatedText', [
      transition('* => *', [
        //reset
        animate('0s', keyframes([style({ transform: 'translateX(-10%)' })])),
        animate('20s', keyframes([style({ transform: 'translateX(100%)' })])),
        //pause
        animate('30s', keyframes([style({ transform: 'translateX(100%)' })])),
      ]),
    ]),
  ],
})
export class FakeStatusComponent implements OnInit, OnDestroy {
  private possibleTexts: string[] = [
    'Granting admin permissions to developers',
    'Upgrading servers to NADIN 18.6',
    'Dropping databases from backups',
    'Answering emails with Lorem Ipsum generator',
    'Setting customer names to phonebook of London',
    'Randomizing prices with e^3*y+42€',
    'Downloading and printing cloud',
    'Schedule MS Teams meeting with colleagues',
    'Plan new bugs for next release',
    'Ordering pizza for next break',
    'Feeding coffee to coding monkeys',
    'Deploying new version announced tomorrow',
  ];
  private usedTexts: string[] = [];
  private tickerTimer: Subscription;
  public currentText: string = '';

  constructor() {}

  public ngOnDestroy(): void {
    if (this.tickerTimer) {
      this.tickerTimer.unsubscribe();
    }
  }

  public setNewText(): void {
    if (this.usedTexts.length == this.possibleTexts.length) {
      this.usedTexts = [];
    }
    this.currentText = _.shuffle(
      this.possibleTexts.filter((txt) => this.usedTexts.indexOf(txt) == -1)
    ).pop();
    this.usedTexts.push(this.currentText);
  }

  public ngOnInit(): void {
    this.setNewText();
  }
}
