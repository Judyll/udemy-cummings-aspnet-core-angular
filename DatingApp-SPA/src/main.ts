import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';

if (environment.production) {
  enableProdMode();
}

// Imported from Angular which means we are making a Web application that
// runs on a browser which bootstraps the AppModule which in turn bootstraps the AppComponent and then
// the AppComponent loads the html on the page.
platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.log(err));
// How does the main.ts file goes into our index.html ???  Our index.html does not have scripts tags inside it ???
// This is where the Angular magic comes in and uses a very popular tool called WebPack.
// WebPack is a module bundler and a task runner at the same time and it will bundle our application
// into javascript and at the same time injects this javascript into our index.html file when it builds it.
// The configuration for WebPack can be found under angular.json
// When you inspect index.html in the browser, you will see runtime.js, polyfills.js, styles.js, vendor.js,
// main.js which is the javascript bundled by WebPack since browser does not understand TypeScripts
