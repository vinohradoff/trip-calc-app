import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
// import { defineCustomElements as pwaElements } from '@ionic/pwa-elements/loader';
// import { defineCustomElements as jeepSqlite } from 'jeep-sqlite/loader';

// import { Capacitor } from '@capacitor/core';
import { AppModule } from './app/app.module';

platformBrowserDynamic()
  .bootstrapModule(AppModule)
  .catch((err) => console.log(err));
