import {AfterViewInit, Component} from '@angular/core';
import {TranslocoService} from "@ngneat/transloco";
import {CookieConsentService} from "../cookie-constent-service";

@Component({
  selector: 'app-settings-toolbar',
  templateUrl: './settings-toolbar.component.html',
  styleUrls: ['./settings-toolbar.component.scss'],
  // eslint-disable-next-line @angular-eslint/prefer-standalone
  standalone: false
})
export class SettingsToolbarComponent implements AfterViewInit {
  constructor(private translate: TranslocoService, private cookieConsentService: CookieConsentService) {
  }


  public ngAfterViewInit(): void {
    setTimeout(() => {
      this.cookieConsentService.receivedCookieConsent.subscribe(consent => {
        if (consent) {
        }
      })
    }, 10)
  }

  public isLanguage(target: string): boolean {
    return this.translate.getActiveLang() === target;
  }

  public changeLanguage(target: string): void {
    this.translate.setActiveLang(target);
  }
}
