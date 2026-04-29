import {Component, OnDestroy, OnInit, inject} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Subscription, timer} from 'rxjs';
import chance from 'chance';
import {ThemeDeciderService} from "../../services/theme-decider.service";
import {animate, keyframes, state, style, transition, trigger} from "@angular/animations";
import {MatDialog} from "@angular/material/dialog";
import {AlertDialogComponent} from "./alert-dialog-component";

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
  ],
  // eslint-disable-next-line @angular-eslint/prefer-standalone
  standalone: false
})
export class RunTimerComponent implements OnInit, OnDestroy {

  public seconds = '00';
  public minutes = '00';
  private timerTimer?: Subscription;
  private waitingMusicTimer?: Subscription;
  public wasManuallyTriggeredShortly = false;
  public targetTime: number = 0;
  public startTime: number = 0;
  public showMusicAttribution: boolean = false;
  private alarmTriggered: boolean = false;
  private audioElevator: HTMLAudioElement = new Audio();
  private audioAlarm: HTMLAudioElement = new Audio();

  private route = inject(ActivatedRoute);
  public themeDeciderService = inject(ThemeDeciderService);
  public msgDialog = inject(MatDialog);

  public nullSafeString(value: string | null): string {
    return value ? value : '';
  }

  public ngOnInit(): void {
    this.themeDeciderService.setIfValid(this.nullSafeString(this.route.snapshot.paramMap.get('theme')));
    this.themeDeciderService.application = this.nullSafeString(this.route.snapshot.paramMap.get('application'));
    this.themeDeciderService.language = this.nullSafeString(this.route.snapshot.paramMap.get('lang'));
    this.targetTime = Number.parseInt(this.nullSafeString(this.route.snapshot.paramMap.get('until')), 10);
    this.startTime = Number.parseInt(this.nullSafeString(this.route.snapshot.paramMap.get('startTime')), 10);

    // noinspection TypeScriptValidateJSTypes
    this.timerTimer = timer(0, 100).subscribe(() => {
      const now = Date.now();
      const remainingMs = this.targetTime - now;

      if (remainingMs <= 0) {
        this.seconds = '00';
        this.minutes = '00';
        if (!this.alarmTriggered) {
          this.alarmTriggered = true;
          this.playAudio();
        }
      } else {
        const totalSeconds = Math.floor(remainingMs / 1000);
        const mins = Math.floor(totalSeconds / 60);
        const secs = totalSeconds % 60;
        this.seconds = secs.toString().padStart(2, '0');
        this.minutes = mins.toString().padStart(2, '0');
      }
    });
  }

  public triggerAlarm(): void {
    if (this.wasManuallyTriggeredShortly) {
      this.msgDialog.open(AlertDialogComponent, {
        data: {message: 'Easy my Padavan!'}
      });
    } else {
      this.wasManuallyTriggeredShortly = true;
      setTimeout(()=>{
        this.wasManuallyTriggeredShortly = false;
      },10_000)
      this.playAudio();
    }
  }

  public playWaitingMusic(): void {
    timer(20_000).subscribe(x => {
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
    this.audioAlarm = new Audio();

    const rnd = this.getWeightedRandom();
    switch (rnd) {
      case 'whistle':
        this.audioAlarm.src = '../../assets/sounds/Whistling.mp3';
        break;
      case 'alarm':
        this.audioAlarm.src = '../../assets/sounds/alarm.wav';
        break;
      case 'bell':
        this.audioAlarm.src = '../../assets/sounds/service-bell.mp3';
        break;
      default:
        this.audioAlarm.src = '../../assets/sounds/alarm.wav';

    }
    this.audioAlarm.load();
    this.audioAlarm.play().then(r => {
    });
    this.waitingMusicTimer = timer(1_000).subscribe(() => {
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
    if (this.waitingMusicTimer) {
      this.waitingMusicTimer.unsubscribe();
    }
    this.stopElevatorMusic();
    if (this.audioAlarm) {
      this.audioAlarm.pause();
      this.audioAlarm.src = '';
    }
  }
}
