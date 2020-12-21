import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription, timer } from 'rxjs';

@Component({
  selector: 'app-run-timer',
  templateUrl: './run-timer.component.html',
  styleUrls: ['./run-timer.component.scss'],
})
export class RunTimerComponent implements OnInit, OnDestroy {
  public seconds = '00';
  public minutes = '00';
  private timerTimer: Subscription;
  private targetTime: number;

  constructor(private route: ActivatedRoute, private router: Router) {}

  public ngOnInit(): void {
    this.targetTime = parseInt(this.route.snapshot.paramMap.get('until'));
    // this.targetTime = new Date().getTime() + 1000 * 60 * 1 - 55000;

    this.timerTimer = timer(0, 100).subscribe(() => {
      const now: Date = new Date(Date.now());
      const date = new Date(this.targetTime - now.getTime());

      if (this.targetTime < now.getTime()) {
        this.seconds = '00';
        this.minutes = '00';
      } else {
        this.seconds = '' + date.getSeconds().toString().padStart(2, '0');
        this.minutes = '' + date.getMinutes().toString().padStart(2, '0');
      }
    });
  }

  public ngOnDestroy(): void {
    if (this.timerTimer) {
      this.timerTimer.unsubscribe();
    }
  }
}
