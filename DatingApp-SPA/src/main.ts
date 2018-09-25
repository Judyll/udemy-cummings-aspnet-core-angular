import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';

if (environment.production) {
  enableProdMode();
}

// Imported from Angular which means we are making a Web application that
// runs on a browser which bootstraps the AppModule which in turn bootstraps the AppComponent and then
// the AppComponent loads the html on the page
platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.log(err));
