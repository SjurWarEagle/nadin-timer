import {Injectable} from '@angular/core';
import {ShepherdService} from 'angular-shepherd';
import {defaultStepOptions, stepsCustomTimer, stepsFirstUsage, stepsLanguage} from "./help-steps";
import {Steps} from "./steps";

@Injectable({
  providedIn: 'root'
})
export class IntroJsService {

  private _historicData: {
    languageExecuted: boolean;
    introExecuted: boolean,
    customTimeExecuted: boolean,
  };

  constructor() {
    this._historicData = JSON.parse(localStorage.getItem('intro')!);
    if (!this._historicData) {
      this._historicData = {introExecuted: false, languageExecuted: false, customTimeExecuted: false};
    }
  }

  public helpIntro(): void {
    if (this._historicData.introExecuted) {
      return;
    }
    const shepherdService = new ShepherdService();
    shepherdService.defaultStepOptions = defaultStepOptions;
    shepherdService.modal = true;
    shepherdService.confirmCancel = false;
    shepherdService.addSteps(stepsFirstUsage(this, Steps.INTRO));
    shepherdService.start();
  }

  public helpCustomTime(): void {
    if (this._historicData.customTimeExecuted) {
      return;
    }
    const shepherdService = new ShepherdService();
    shepherdService.defaultStepOptions = defaultStepOptions;
    shepherdService.modal = true;
    shepherdService.confirmCancel = false;
    shepherdService.addSteps(stepsCustomTimer(this, Steps.CUSTOM_TIMER));
    shepherdService.start();
  }

  public helpLanguage(): void {
    if (this._historicData.languageExecuted) {
      return;
    }
    const shepherdService = new ShepherdService();
    shepherdService.defaultStepOptions = defaultStepOptions;
    shepherdService.modal = true;
    shepherdService.confirmCancel = false;
    shepherdService.addSteps(stepsLanguage(this, Steps.LANGUAGE));
    shepherdService.start();
  }

  markAsDone(step: Steps) {
    if (step === Steps.INTRO) {
      this._historicData.introExecuted = true;
      // this.helpCustom();
    } else if (step === Steps.LANGUAGE) {
      this._historicData.languageExecuted = true;
    } else if (step === Steps.CUSTOM_TIMER) {
      this._historicData.customTimeExecuted = true;
    } else {
      throw new Error("unknown step '" + Steps[step] + "'")
    }
    localStorage.setItem('intro', JSON.stringify(this._historicData));
  }

}
