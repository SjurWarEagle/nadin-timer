import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './components/app/app.component';
import {StatusLogoComponent} from './components/status-logo/status-logo.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {TimeSelectComponent} from './components/time-select/time-select.component';
import {RunTimerComponent} from './components/run-timer/run-timer.component';
import {faBullhorn, faClock, faHistory} from '@fortawesome/free-solid-svg-icons';
import {NadinLogoComponent} from './components/nadin-logo/nadin-logo.component';
import {FormsModule} from '@angular/forms';
import {TimerProgressComponent} from "./components/timer-progress/timer-progress.component";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {MatProgressBarModule} from "@angular/material/progress-bar";
import {MatTooltipModule} from "@angular/material/tooltip";
import {BuildVersionDisplayComponent} from './components/build-version-display/build-version-display.component';
import {provideHttpClient, withInterceptorsFromDi} from '@angular/common/http';
import {TranslocoRootModule} from './transloco-root.module';
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatButtonModule} from "@angular/material/button";
import {SettingsToolbarComponent} from "./settings-toolbar/settings-toolbar.component";
import {CommonModule} from "@angular/common";
import {FaIconLibrary, FontAwesomeModule} from "@fortawesome/angular-fontawesome";

@NgModule({
  declarations: [
    AppComponent,
    SettingsToolbarComponent,
    StatusLogoComponent,
    NadinLogoComponent,
    TimerProgressComponent,
    BuildVersionDisplayComponent,
    TimeSelectComponent,
    RunTimerComponent,
  ],
  bootstrap: [
    AppComponent,
  ],
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
    MatProgressBarModule,
    BrowserModule,
    BrowserAnimationsModule,
    FontAwesomeModule,
    AppRoutingModule,
    MatTooltipModule,
    FormsModule,
    TranslocoRootModule,
    MatToolbarModule,
    MatButtonModule,
  ],
  providers: [
    provideHttpClient(withInterceptorsFromDi()),
  ]
})
export class AppModule {
  constructor(private library: FaIconLibrary) {
    library.addIcons(faClock, faHistory, faBullhorn);
  }
}
