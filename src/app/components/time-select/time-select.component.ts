import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-time-select',
  templateUrl: './time-select.component.html',
  styleUrls: ['./time-select.component.scss'],
})
export class TimeSelectComponent implements OnInit {
  constructor(private router: Router) {}

  public ngOnInit(): void {}

  public untilQuarterPast(): void {
    const now = new Date();
    let targetTime: number;
    if (now.getMinutes() > 15) {
      targetTime = now.getTime() + (60 + 15 - now.getMinutes()) * 60 * 1000;
    } else {
      targetTime = now.getTime() + (15 - now.getMinutes()) * 60 * 1000;
    }
    this.router.navigate(['/run', { until: targetTime }]);
  }

  public untilHalfPast(): void {
    const now = new Date();
    let targetTime: number;
    if (now.getMinutes() < 30) {
      targetTime = now.getTime() + (30 - now.getMinutes()) * 60 * 1000;
    } else {
      targetTime = now.getTime() + (60 + 30 - now.getMinutes()) * 60 * 1000;
    }
    this.router.navigate(['/run', { until: targetTime }]);
  }

  public untilQuarterBefore(): void {
    const now = new Date();
    let targetTime: number;
    if (now.getMinutes() < 45) {
      targetTime = now.getTime() + (45 - now.getMinutes()) * 60 * 1000;
    } else {
      targetTime = now.getTime() + (60 + 45 - now.getMinutes()) * 60 * 1000;
    }
    this.router.navigate(['/run', { until: targetTime }]);
  }

  public untilFull(): void {
    const now = new Date();
    let targetTime = 0;
    if (now.getMinutes() > 0) {
      targetTime = now.getTime() + (60 - now.getMinutes()) * 60 * 1000;
    }
    this.router.navigate(['/run', { until: targetTime }]);
  }

  public startTimerMinutes(minutes: number): void {
    const targetTime = new Date().getTime() + 1000 * 60 * minutes;
    this.router.navigate(['/run', { until: targetTime }]);
  }
}
