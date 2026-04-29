import {CookieConsentConfig} from "vanilla-cookieconsent";
import {BehaviorSubject} from "rxjs";
import {Injectable} from "@angular/core";


@Injectable({
  providedIn: 'root'
})
export class CookieConsentService {
  public receivedCookieConsent: BehaviorSubject<boolean | null> = new BehaviorSubject<boolean | null>(null);

  constructor() {
  }

  // fallow-ignore-next-line unused-class-members
  public getCookieConsentConfig(): CookieConsentConfig {
    return {
      // autoClearCookies: true,
      // autoShow: true,
      // disablePageInteraction: false,
      // hideFromBots: true,
      manageScriptTags: false,
      // revision: 0,
      // root: null,
      // mode: 'opt-in',

      guiOptions: {
        consentModal: {
          layout: 'box wide',
          position: 'bottom center',
          equalWeightButtons: true,
          flipButtons: false,
        },
        preferencesModal: {
          layout: 'box',
          equalWeightButtons: true,
          flipButtons: false,
        },
      },

      onConsent: ({cookie}) => {
        // console.log('onConsent fired ', cookie);
        this.receivedCookieConsent.next(cookie.categories.indexOf("usability")!=-1)
      },

      categories: {
        // necessary: {
        //   enabled: true,
        //   readOnly: true,
        // },
        usability: {
          enabled: true,
          readOnly: false,
          // autoClear: {
          //   cookies: [{name: /^(_ga4|_help)/}],
          // },
          // services: {
          //   // ga4: {
          //   //   label: 'Google Analytics 4',
          //   //   onAccept: () => {
          //   //     console.log('enabled ga4');
          //   //   },
          //   //   onReject: () => {
          //   //     console.log('disabled ga4');
          //   //   },
          //   // },
          //   help: {
          //     label: 'Remember help was shown',
          //     onAccept: () => {
          //       console.log('enabled help-state');
          //     },
          //     onReject: () => {
          //       console.log('disabled help-state');
          //     },
          //   },
          // },
        },
      },

      language: {
        default: 'en',
        // autoDetect: "browser"
        translations: {
          en: {
            consentModal: {
              title: 'We use cookies!',
              description:
                'This website collects cookies to deliver better user experience. <br>\n' +
                'All data is only stored in your browser!<br>\n' +
                '<br>\n' +
                '<b>Purpose:</b><br>\n' +
                'Remember your settings and have a smoother experience.\n',
              acceptAllBtn: 'Accept all',
              acceptNecessaryBtn: 'Reject all',
              //showPreferencesBtn: 'Manage individual preferences',
              footer: `
<!--                <a href="#impressum">Impressum</a>-->
<!--                <a href="#privacy">Privacy Policy</a>-->
<!-- -->              `,
            },
            preferencesModal: {
              title: 'CookieConsent Center',
              acceptAllBtn: 'Accept all',
              acceptNecessaryBtn: 'Reject all',
              savePreferencesBtn: 'Accept current selection',
              closeIconLabel: 'Close modal',
              serviceCounterLabel: 'Service|Services',
              sections: [
                {
                  title: 'Cookie Usage',
                  description:
                    'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod ',
                },
                {
                  title:
                    'Strictly Necessary Cookies <span class="pm__badge">always enabled</span>',
                  description: 'Category description',
                  linkedCategory: 'necessary',
                },
                {
                  title: 'Performance & Analytics Cookies',
                  description: 'Category description',
                  linkedCategory: 'analytics',
                },
                {
                  title: 'Advertisement Cookies',
                  description: 'Category description',
                  linkedCategory: 'ads',
                },
                {
                  title: 'Last section',
                  description:
                    'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequa',
                },
              ],
            },
          },
        },
      },
    };
  };

}
