import { Injectable } from '@angular/core';

import { environment } from 'src/environments/environment';
import { SQLiteService } from './sqlite.service';
import { StorageService } from './storage.service';

@Injectable({
  providedIn: 'root',
})
export class InitializeAppService {
  isAppInit: boolean = false;
  platform!: string;

  constructor(
    private sqliteService: SQLiteService,
    private storageService: StorageService
  ) {}

  async initializeApp() {
    await this.sqliteService.initializePlugin().then(async (ret) => {
      this.platform = this.sqliteService.platform;
      try {
        if (this.sqliteService.platform === 'web') {
          await this.sqliteService.initWebStore();
        }
        // Initialize the myDb database
        const DB_NAME = environment.dbName;
        await this.storageService.initializeDatabase(DB_NAME);
        // Here Initialize MOCK_DATA if required
        // Initialize whatever database and/or MOCK_DATA you like
        if (this.sqliteService.platform === 'web') {
          await this.sqliteService.saveToStore(DB_NAME);
        }
        this.isAppInit = true;
      } catch (error) {
        console.error(`initializeAppError: ${error}`);
        // await Toast.show({
        //   text: `initializeAppError: ${error}`,
        //   duration: 'long',
        // });
      }
    });
  }
}
