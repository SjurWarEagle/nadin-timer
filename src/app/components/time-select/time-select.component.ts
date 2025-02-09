import {AfterViewInit, Component} from '@angular/core';
import {Router} from '@angular/router';
import {ThemeDeciderService} from '../../services/theme-decider.service';
import {CookieConsentService} from "../../cookie-constent-service";

@Component({
    selector: 'app-time-select',
    templateUrl: './time-select.component.html',
    styleUrls: ['./time-select.component.scss'],
  // eslint-disable-next-line @angular-eslint/prefer-standalone
  standalone: false

})
export class TimeSelectComponent implements AfterViewInit {
  public showCustomPanel = false;
  public customMinutes = 5;

  constructor(private router: Router,
              private cookieConsentService: CookieConsentService,
              private themeDeciderService: ThemeDeciderService
  ) {
  }

  get showDebug(): boolean {
    return false;
  }

  public untilQuarterPast(): void {
    const now = new Date();
    let targetTime: number;
    if (now.getMinutes() > 15) {
      targetTime = now.getTime() + (60 + 15 - now.getMinutes()) * 60 * 1000;
    } else {
      targetTime = now.getTime() + (15 - now.getMinutes()) * 60 * 1000;
    }
    this.startTimer(targetTime);
  }

  public untilHalfPast(): void {
    const now = new Date();
    let targetTime: number;
    if (now.getMinutes() < 30) {
      targetTime = now.getTime() + (30 - now.getMinutes()) * 60 * 1000;
    } else {
      targetTime = now.getTime() + (60 + 30 - now.getMinutes()) * 60 * 1000;
    }
    this.startTimer(targetTime);
  }

  public untilQuarterBefore(): void {
    const now = new Date();
    let targetTime: number;
    if (now.getMinutes() < 45) {
      targetTime = now.getTime() + (45 - now.getMinutes()) * 60 * 1000;
    } else {
      targetTime = now.getTime() + (60 + 45 - now.getMinutes()) * 60 * 1000;
    }
    this.startTimer(targetTime);
  }

  public untilFull(): void {
    const now = new Date();
    let targetTime = 0;
    if (now.getMinutes() > 0) {
      targetTime = now.getTime() + (60 - now.getMinutes()) * 60 * 1000;
    }
    this.startTimer(targetTime);
  }

  public someSeconds(): void {
    const targetTime = new Date().getTime() + 1000 * 5;
    this.startTimer(targetTime);
  }

  public customChanged(event: any): void {
    this.customMinutes = +event.srcElement?.value;
  }

  public toggleCustomTime(): void {
    this.showCustomPanel = !this.showCustomPanel;
    if (this.showCustomPanel) {
      this.cookieConsentService.receivedCookieConsent.subscribe(consent => {
        if (consent) {
        }
      })
    }
  }

  public startTimerMinutes(minutes: number): void {
    const targetTime = new Date().getTime() + 1000 * 60 * minutes;
    this.startTimer(targetTime);
  }

  public ngAfterViewInit(): void {
    setTimeout(() => {
      this.cookieConsentService.receivedCookieConsent.subscribe(consent => {
        if (consent) {
        }
      })
    }, 10)
  }

  private startTimer(targetTime: number) {
    this.router.navigate(
      [
        '/run', {
        startTime: Date.now(),
        until: targetTime,
        application: this.themeDeciderService.application,
        theme: this.themeDeciderService.theme,
        lang: this.themeDeciderService.language
      }
      ]
    );

  }
}
