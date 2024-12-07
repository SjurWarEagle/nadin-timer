import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';

if (environment.production) {
  enableProdMode();
}

platformBrowserDynamic()
  .bootstrapModule(AppModule)
  // .then((moduleRef) => {
  //   const injector = moduleRef.injector;
  //   console.log("injector",injector);
  //   Expose Angular injector globally
    // (window as any).ngInjector = injector;
  // })
  .catch((err) => console.error(err));
