import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {Subscription, timer} from 'rxjs';

@Component({
    selector: 'app-timer-progress',
    templateUrl: './timer-progress.component.html',
    styleUrls: ['./timer-progress.component.scss'],
    standalone: false
})
export class TimerProgressComponent implements OnInit, OnDestroy {
  @Input()
  public fromTime: number = 0;

  public duration: number = 100;
  public progressPercentage: number = 0;

  @Input()
  public toTime: number = 1000;
  private timerTimer?: Subscription = undefined;

  constructor() {
  }

  public ngOnDestroy(): void {
    if (this.timerTimer) {
      this.timerTimer.unsubscribe();
    }
  }

  public ngOnInit(): void {
    this.duration = this.toTime - this.fromTime;
    this.timerTimer = timer(0, 350).subscribe(() => {
      //percentage with 1 digit
      this.progressPercentage = Math.round(1000 - ((this.toTime - Date.now()) / this.duration) * 1000) / 10;
    });
  }

}
