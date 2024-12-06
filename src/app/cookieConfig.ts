import {NgcCookieConsentConfig} from 'ngx-cookieconsent';

export const cookieConfig:NgcCookieConsentConfig = {
  cookie: {
    domain: 'timer.tkunkel.de' // or 'your.domain.com' // it is mandatory to set a domain, for cookies to work properly (see https://goo.gl/S2Hy2A)
  },
  palette: {
    popup: {
      background: '#1F2F56'
    },
    button: {
      background: '#6091C3'
    }
  },
  position: 'bottom',
  // position: 'top-left',
  theme: 'classic',
  type: 'opt-in',
  content: {
    href:"./assets/cookieConsent.html"
  }
};
