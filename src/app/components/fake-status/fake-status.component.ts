import {Component, OnDestroy, OnInit} from '@angular/core';
import * as _ from 'lodash';
import {Subscription} from 'rxjs/internal/Subscription';
import {animate, keyframes, style, transition, trigger,} from '@angular/animations';
import {ThemeDeciderService} from '../../services/theme-decider.service';

@Component({
    selector: 'app-fake-status',
    templateUrl: './fake-status.component.html',
    styleUrls: ['./fake-status.component.scss'],
    animations: [
        trigger('updatedText', [
            transition('* => *', [
                // reset
                animate('0s', keyframes([style({ transform: 'translateX(100%)' })])),
                animate('30s', keyframes([style({ transform: 'translateX(-20%)' })])),
                // pause
                animate('40s', keyframes([style({ transform: 'translateX(-1000%)' })])),
            ]),
        ]),
    ],
  // eslint-disable-next-line @angular-eslint/prefer-standalone
  standalone: false
})
export class FakeStatusComponent implements OnInit, OnDestroy {
  private usedTexts: string[] = [];
  private tickerTimer?: Subscription;
  public currentText: string | undefined = '';

  constructor(private themeDeciderService: ThemeDeciderService) {
  }

  public ngOnDestroy(): void {
    if (this.tickerTimer) {
      this.tickerTimer.unsubscribe();
    }
  }

  public setNewText(): void {
    if (this.usedTexts.length === this.themeDeciderService.possibleFakeStatus.length) {
      this.usedTexts = [];
    }
    this.currentText = _.shuffle(
      this.themeDeciderService.possibleFakeStatus.filter((txt) => this.usedTexts.indexOf(txt) === -1)
    ).pop();
    if (this.currentText != null) {
      this.usedTexts.push(this.currentText);
    }
  }

  public ngOnInit(): void {
    this.setNewText();
  }
}
