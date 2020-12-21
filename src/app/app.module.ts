import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './components/app/app.component';
import { StatusLogoComponent } from './components/status-logo/status-logo.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TimeSelectComponent } from './components/time-select/time-select.component';
import { RunTimerComponent } from './components/run-timer/run-timer.component';

@NgModule({
  declarations: [
    AppComponent,
    StatusLogoComponent,
    TimeSelectComponent,
    RunTimerComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserModule,
    BrowserAnimationsModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
