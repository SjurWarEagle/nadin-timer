import {Component, OnInit} from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-time-select',
  templateUrl: './time-select.component.html',
  styleUrls: ['./time-select.component.scss'],
})
export class TimeSelectComponent implements OnInit {
  constructor(private router:Router) {
  }

  public ngOnInit(): void {
  }

  public startTimerMinutes(minutes: number): void {
    const targetTime = new Date().getTime() + 1000 * 60 * minutes;
    this.router.navigate(['/run',{until:targetTime}]);
  }
}
