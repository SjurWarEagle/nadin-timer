import {Component, inject} from '@angular/core';
import {ThemeDeciderService} from "../../services/theme-decider.service";

@Component({
    selector: 'app-nadin-logo',
    templateUrl: './nadin-logo.component.html',
    styleUrls: ['./nadin-logo.component.scss'],
  // eslint-disable-next-line @angular-eslint/prefer-standalone
  standalone: false
})
export class NadinLogoComponent {

  private themeDeciderService = inject(ThemeDeciderService);


  public getTheme(): string {
    return this.themeDeciderService.theme.toLowerCase();
  }

  public getBackgroundImageUrl(): any {
    return {
      'background-image': 'url(../../assets/season/' + this.getTheme() + '/office.png)'
    };
  }

}
