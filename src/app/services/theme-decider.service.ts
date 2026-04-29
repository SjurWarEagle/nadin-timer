import {Injectable, inject} from '@angular/core';
import {Title} from "@angular/platform-browser";
import {TranslocoService} from "@ngneat/transloco";

@Injectable({
  providedIn: 'root'
})

export class ThemeDeciderService {
  private static readonly VALID_THEMES = new Set(['Winter', 'Autumn', 'Easter', 'Spring', 'Summer']);

  private static readonly APP_CONFIGS: Record<string, { logo: string; logoRunning: string; logoFinished: string; title: string }> = {
    default: { logo: 'office.png', logoRunning: 'office.png', logoFinished: 'office.png', title: 'Meeting Timer' },
    nadin: { logo: 'nadin.png', logoRunning: 'nadin.png', logoFinished: 'nadin.png', title: 'Meeting Timer' },
    ldb: { logo: 'ldb.png', logoRunning: 'ldb-running.png', logoFinished: 'ldb-done.png', title: 'Meeting Timer' },
    poi: { logo: 'poi.jpg', logoRunning: 'poi.jpg', logoFinished: 'poi.jpg', title: 'Meeting Timer' },
    vw: { logo: 'vw.png', logoRunning: 'vw.png', logoFinished: 'vw.png', title: 'Meeting Timer' },
    gremlins: { logo: 'gremlins.png', logoRunning: 'gremlins.png', logoFinished: 'gremlins.png', title: 'Meeting Timer' },
  };

  private static readonly SEASON_BY_MONTH: string[] = [
    'Winter', 'Winter', 'Spring',  // Jan, Feb, Mar
    'Spring', 'Spring', 'Summer',   // Apr, May, Jun
    'Summer', 'Summer', 'Autumn',    // Jul, Aug, Sep
    'Autumn', 'Autumn', 'Winter'    // Oct, Nov, Dec
  ];

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
    this.myAppLogo = 'nadin.png';

    const deviceLanguage = window?.navigator.language?.substring(0, 2);
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
    this.myApplication = value?value:'default';
    const config = ThemeDeciderService.APP_CONFIGS[this.myApplication.toLowerCase()];
    console.log(ThemeDeciderService.APP_CONFIGS[this.myApplication.toLowerCase()])
    if (config) {
      this.myAppLogo = config.logoRunning;
      this.myAppLogoFinished = config.logoFinished;
      this.titleService.setTitle(config.title);
    } else {
      console.error(`Unknown application ('${this.myApplication}')=>('${value}')`);
    }
  }

  get application(): string {
    if (!this.myApplication) {
      this.myApplication = 'default';
    }
    return this.myApplication;
  }

  public setIfValid(newTheme: string): void {
    if (!newTheme) {
      return;
    }
    if (ThemeDeciderService.VALID_THEMES.has(newTheme)) {
      this.myTheme = newTheme;
    } else {
      console.log(`Invalid theme '${newTheme}' ignoring.`);
    }
  }

  private generateRandomTheme(): string {
    const month = new Date().getMonth();
    return ThemeDeciderService.SEASON_BY_MONTH[month];
  }
}
