import {AfterViewInit, Component} from '@angular/core';
import {TranslocoService} from "@ngneat/transloco";
import {IntroJsService} from "../services/intro-js.service";
import {CookieConsentService} from "../cookie-constent-service";

@Component({
    selector: 'app-settings-toolbar',
    templateUrl: './settings-toolbar.component.html',
    styleUrls: ['./settings-toolbar.component.scss']
})
export class SettingsToolbarComponent implements AfterViewInit {
    constructor(
        private translate: TranslocoService,
        private introService: IntroJsService,
        private cookieConsentService: CookieConsentService
    ) {
    }


  public ngAfterViewInit(): void {
    setTimeout(() => {
      this.cookieConsentService.receivedCookieConsent.subscribe(consent => {
        if (consent) {
          this.introService.helpLanguage();
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
