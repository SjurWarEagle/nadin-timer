import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Subscription, timer} from 'rxjs';
import * as chance from 'chance';
import {ThemeDeciderService} from "../../services/theme-decider.service";
import {animate, keyframes, state, style, transition, trigger} from "@angular/animations";

@Component({
  selector: 'app-run-timer',
  templateUrl: './run-timer.component.html',
  styleUrls: ['./run-timer.component.scss'],
  animations: [
    trigger('startTimer', [
      // ...
      state('true', style({})),
      state('false', style({})),
      transition('* => *', [
        animate('0s', keyframes([style({transform: 'translateX(100%)'})])),
        animate('30s', keyframes([style({transform: 'translateX(-20%)'})])),
      ]),
    ])
  ]
})
export class RunTimerComponent implements OnInit, OnDestroy {

  public seconds = '00';
  public minutes = '00';
  private timerTimer?: Subscription;
  public targetTime: number = 0;
  public startTime: number = 0;
  public showMusicAttribution: boolean = false;
  private alarmTriggered: boolean = false;
  private audioElevator: HTMLAudioElement = new Audio();

  constructor(private route: ActivatedRoute, public themeDeciderService: ThemeDeciderService) {
  }

  public nullSafeString(value: string | null): string {
    return value ? value : '';
  }

  public ngOnInit(): void {
    this.themeDeciderService.setIfValid(this.nullSafeString(this.route.snapshot.paramMap.get('theme')));
    this.themeDeciderService.application = this.nullSafeString(this.route.snapshot.paramMap.get('application'));
    this.themeDeciderService.language = this.nullSafeString(this.route.snapshot.paramMap.get('lang'));
    this.targetTime = parseInt(this.nullSafeString(this.route.snapshot.paramMap.get('until')), 10);
    this.startTime = parseInt(this.nullSafeString(this.route.snapshot.paramMap.get('startTime')), 10);

    // noinspection TypeScriptValidateJSTypes
    this.timerTimer = timer(0, 100).subscribe(() => {
      const now: Date = new Date(Date.now());
      const date: Date = new Date(this.targetTime - now.getTime());

      if (this.targetTime < now.getTime()) {
        this.seconds = '00';
        this.minutes = '00';
        if (!this.alarmTriggered) {
          this.alarmTriggered = true;
          this.playAudio();
        }
      } else {
        this.seconds = '' + date.getSeconds().toString().padStart(2, '0');
        this.minutes = '' + (date.getMinutes() + (date.getHours() - 1) * 60).toString().padStart(2, '0');
      }
    });
  }

  public triggerAlarm(): void {
    this.playAudio();
  }

  public playWaitingMusic(): void {
    timer(10_000).subscribe(x => {
      this.audioElevator = new Audio();
      this.audioElevator.volume = 0.5;
      this.audioElevator.src = '../../assets/sounds/elevator-music-bossa-nova-background-music-version-60s-10900.mp3';
      this.showMusicAttribution = true;
      this.audioElevator.load();
      this.audioElevator.play().then(r => {
      });
    })
  }

  public playAudio(): void {
    const audio = new Audio();

    const rnd = this.getWeightedRandom();
    switch (rnd) {
      case 'whistle':
        audio.src = '../../assets/sounds/Whistling.mp3';
        break;
      case 'alarm':
        audio.src = '../../assets/sounds/alarm.wav';
        break;
      case 'bell':
        audio.src = '../../assets/sounds/service-bell.mp3';
        break;
      default:
        audio.src = '../../assets/sounds/alarm.wav';

    }
    audio.load();
    audio.play().then(r => {
    });
    timer(1_000).subscribe(() => {
      this.playWaitingMusic()
    })
  }

  private getWeightedRandom(): string {
    return chance().weighted(['whistle', 'alarm', 'bell'], [1, 5, 2]);
  }

  public isCloseToEnd(): boolean {
    return !this.isDone() && (+this.minutes === 0);
  }

  public isDone(): boolean {
    return (+this.minutes + +this.seconds === 0);
  }

  public isNearToEnd(): boolean {
    return !this.isDone() && (+this.minutes === 1);
  }

  public stopElevatorMusic(): void {
    this.audioElevator.pause()
  }

  public ngOnDestroy(): void {
    if (this.timerTimer) {
      this.timerTimer.unsubscribe();
    }
    this.stopElevatorMusic();
  }
}
