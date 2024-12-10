import { Component } from '@angular/core';
import {environment} from "../../../environments/environment";

@Component({
    selector: 'app-build-version-display',
    templateUrl: './build-version-display.component.html',
    styleUrls: ['./build-version-display.component.scss'],
    standalone: false
})
export class BuildVersionDisplayComponent {
  public buildDate:string=environment.buildDateString;
}
