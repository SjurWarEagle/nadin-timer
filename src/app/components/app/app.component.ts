import {Component, OnDestroy, OnInit, ViewEncapsulation} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Subscription} from 'rxjs';
import {ThemeDeciderService} from "../../services/theme-decider.service";
import {ShepherdService} from "angular-shepherd";
import {
  NgcCookieConsentService,
  NgcInitializationErrorEvent, NgcInitializingEvent,
  NgcNoCookieLawEvent,
  NgcStatusChangeEvent
} from "ngx-cookieconsent";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class AppComponent implements OnInit, OnDestroy {
  private subscriptionParameter?: Subscription;
  //keep refs to subscriptions to be able to unsubscribe later
  private popupOpenSubscription!: Subscription;
  private popupCloseSubscription!: Subscription;
  private initializingSubscription!: Subscription;
  private initializedSubscription!: Subscription;
  private initializationErrorSubscription!: Subscription;
  private statusChangeSubscription!: Subscription;
  private revokeChoiceSubscription!: Subscription;
  private noCookieLawSubscription!: Subscription;

  //NOTE: It is highly recommended to inject ShepherdService into your app.component.ts.
  // Injecting it at the app level ensures you only create one instance of Shepherd.
  constructor(private route: ActivatedRoute,
              private shepherdService: ShepherdService,
              private themeDeciderService: ThemeDeciderService,
              private ccService: NgcCookieConsentService
  ) {
  }

  public ngOnDestroy(): void {
    if (this.subscriptionParameter) {
      this.subscriptionParameter.unsubscribe();
    }

    // unsubscribe to cookieconsent observables to prevent memory leaks
    this.popupOpenSubscription.unsubscribe();
    this.popupCloseSubscription.unsubscribe();
    this.initializingSubscription.unsubscribe();
    this.initializedSubscription.unsubscribe();
    this.initializationErrorSubscription.unsubscribe();
    this.statusChangeSubscription.unsubscribe();
    this.revokeChoiceSubscription.unsubscribe();
    this.noCookieLawSubscription.unsubscribe();
  }

  public ngOnInit(): void {
    this.subscriptionParameter = this.route.queryParams
      .subscribe((params) => {
          // console.log(params);
          this.themeDeciderService.setIfValid(params["theme"] as string);
          this.themeDeciderService.application = params["application"] as string;
          this.themeDeciderService.language = params["lang"] as string;
        }
      );

    // subscribe to cookieconsent observables to react to main events
    this.popupOpenSubscription = this.ccService.popupOpen$.subscribe(
      () => {
        // you can use this.ccService.getConfig() to do stuff...
      });

    this.popupCloseSubscription = this.ccService.popupClose$.subscribe(
      () => {
        // you can use this.ccService.getConfig() to do stuff...
      });

    this.initializingSubscription = this.ccService.initializing$.subscribe(
      (event: NgcInitializingEvent) => {
        // the cookieconsent is initilializing... Not yet safe to call methods like `NgcCookieConsentService.hasAnswered()`
        console.log(`initializing: ${JSON.stringify(event)}`);
      });

    this.initializedSubscription = this.ccService.initialized$.subscribe(
      () => {
        // the cookieconsent has been successfully initialized.
        // It's now safe to use methods on NgcCookieConsentService that require it, like `hasAnswered()` for eg...
        console.log(`initialized: ${JSON.stringify(event)}`);
      });

    this.initializationErrorSubscription = this.ccService.initializationError$.subscribe(
      (event: NgcInitializationErrorEvent) => {
        // the cookieconsent has failed to initialize...
        console.log(`initializationError: ${JSON.stringify(event.error?.message)}`);
      });

    this.statusChangeSubscription = this.ccService.statusChange$.subscribe(
      (event: NgcStatusChangeEvent) => {
        // you can use this.ccService.getConfig() to do stuff...
      });

    this.revokeChoiceSubscription = this.ccService.revokeChoice$.subscribe(
      () => {
        // you can use this.ccService.getConfig() to do stuff...
      });

    this.noCookieLawSubscription = this.ccService.noCookieLaw$.subscribe(
      (event: NgcNoCookieLawEvent) => {
        // you can use this.ccService.getConfig() to do stuff...
      });
  }
}
