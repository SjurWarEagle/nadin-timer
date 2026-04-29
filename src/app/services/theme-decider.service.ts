import {Injectable, inject} from '@angular/core';
import {Title} from "@angular/platform-browser";
import {TranslocoService} from "@ngneat/transloco";

@Injectable({
  providedIn: 'root'
})

export class ThemeDeciderService {
  get language(): string {
    return this.translate.getActiveLang();
  }

  set language(value: string) {
    if (value) {
      this.translate.setActiveLang(value);
    }
  }

  private titleService = inject(Title);
  private translate = inject(TranslocoService);

  constructor() {
    this.myAppLogo = 'Nadin_Logo.svg';

    const deviceLanguage = window?.navigator.language?.substring(
      0,
      2
    )

    this.translate.setActiveLang(deviceLanguage);
  }

  public myAppLogoFinished: string = '';
  private myAppLogo: string;
  private myApplication: string = '';

  get appLogoFinished(): string {
    return this.myAppLogoFinished;
  }

  set appLogo(value: string) {
    this.myAppLogo = value;
  }

  get appLogo(): string {
    return this.myAppLogo;
  }

  private myTheme: string = '';

  set theme(value: string) {
    this.myTheme = value;
  }

  get theme(): string {
    if (!this.myTheme) {
      this.myTheme = this.generateRandomTheme();
    }
    return this.myTheme;
  }

  set application(value: string) {
    this.myApplication = value;
    switch (this.application.toLowerCase()) {
      case 'nadin':
        this.myAppLogo = 'Nadin_Logo.svg';
        this.myAppLogo = 'Nadin_Logo.svg';
        this.myAppLogoFinished = 'Nadin_Logo.svg';
        this.titleService.setTitle("Meeting Timer")
        break;
      case 'ldb':
        this.myAppLogo = 'ldb.png';
        this.myAppLogo = 'ldb-running.png';
        this.myAppLogoFinished = 'ldb-done.png';
        this.titleService.setTitle("Meeting Timer")
        break;
      case 'poi':
        this.myAppLogo = 'poi.jpg';
        this.myAppLogo = 'poi.jpg';
        this.myAppLogoFinished = 'poi.jpg';
        this.titleService.setTitle("Meeting Timer")
        break;
      case 'vw':
        this.myAppLogo = 'vw.png';
        this.myAppLogoFinished = this.myAppLogo;
        this.titleService.setTitle("Meeting Timer")
        break;
      case 'gremlins':
        this.myAppLogo = 'gremlins.png';
        this.myAppLogoFinished = this.myAppLogo;
        this.titleService.setTitle("Meeting Timer")
        break;
      default:
        console.error(`Unknown application '${this.application}'`);
        break;
    }
    // console.log(this.application.toLowerCase());
    // console.log(this.myAppLogo);
  }


  get application(): string {
    if (!this.myApplication) {
      this.myApplication = 'Nadin';
    }
    return this.myApplication;
  }

  public setIfValid(newTheme: string): void {
    if (!newTheme) {
      return;
    }
    if (newTheme === 'Winter') {
      this.myTheme = newTheme;
    } else if (newTheme === 'Autumn') {
      this.myTheme = newTheme;
    } else if (newTheme === 'Easter') {
      this.myTheme = newTheme;
    } else if (newTheme === 'Spring') {
      this.myTheme = newTheme;
    } else if (newTheme === 'Summer') {
      this.myTheme = newTheme;
    } else {
      console.log(`Invalid theme '${newTheme}' ignoring.`);
    }
    console.log(`Using theme '${this.myTheme}'.`);
  }

  private generateRandomTheme(): string {

    const now = new Date();
//    if (now.getMonth() === 3) {
//      return 'Easter';
//    } else
    if (now.getMonth() >= 9 && now.getMonth() < 11) {
      return 'Autumn';
    } else if (now.getMonth() >= 11 || now.getMonth() <= 0) {
      return 'Winter';
    } else if (now.getMonth() < 3) {
      return 'Spring';
    } else if (now.getMonth() >= 4 || now.getMonth() <= 9) {
      return 'Summer';
    }
    return 'Spring';
  }

}
