import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TimeSelectComponent } from './components/time-select/time-select.component';
import { RunTimerComponent } from './components/run-timer/run-timer.component';

const routes: Routes = [
  { path: '', component: TimeSelectComponent , pathMatch: 'full' },
  { path: 'run', component: RunTimerComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes,{ useHash: true })],
  exports: [RouterModule],
})
export class AppRoutingModule {}
