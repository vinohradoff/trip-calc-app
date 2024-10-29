import { Injectable } from '@angular/core';
import { SQLiteDBConnection } from '@capacitor-community/sqlite';
import { DBUpgradeStatements } from '../upgrades/db.upgrade.statements';
import { DbnameVersionService } from './dbname-version.service';
import { SQLiteService } from './sqlite.service';

@Injectable({
  providedIn: 'root',
})
export class StorageService {
  // public userList: BehaviorSubject<User[]> = new BehaviorSubject<User[]>([]);
  private databaseName: string = '';
  private uUpdStmts: DBUpgradeStatements = new DBUpgradeStatements();
  private versionUpgrades;
  private loadToVersion;
  private db!: SQLiteDBConnection;
  // private isUserReady: BehaviorSubject<boolean> = new BehaviorSubject(false);

  constructor(
    private sqliteService: SQLiteService,

    private dbVerService: DbnameVersionService
  ) {
    this.versionUpgrades = this.uUpdStmts.tripUpgrades;
    this.loadToVersion =
      this.versionUpgrades[this.versionUpgrades.length - 1].toVersion;
  }

  debugDb() {
    this.db.exportToJson('full').then((res) => {
      console.log('re', res.export?.tables);
    });
  }

  async initializeDatabase(dbName: string) {
    this.databaseName = dbName;
    // create upgrade statements
    await this.sqliteService.addUpgradeStatement({
      database: this.databaseName,
      upgrade: this.versionUpgrades,
    });

    // create and/or open the database
    this.db = await this.sqliteService.openDatabase(
      this.databaseName,
      false,
      'no-encryption',
      this.loadToVersion,
      false
    );

    this.dbVerService.set(this.databaseName, this.loadToVersion);
    // await this.getUsers();
  }

  run(sql: string, value: any[]) {
    return this.db.run(sql, value);
  }

  query(sql: string) {
    return this.db.query(sql);
  }
  // Current database state
  // userState() {
  //   return this.isUserReady.asObservable();
  // }
  // fetchUsers(): Observable<User[]> {
  //   return this.userList.asObservable();
  // }

  // async loadUsers() {
  //   const users: User[] = (await this.db.query('SELECT * FROM users;'))
  //     .values as User[];
  //   this.userList.next(users);
  // }
  // CRUD Operations
  // async getUsers() {
  //   await this.loadUsers();
  //   this.isUserReady.next(true);
  // }
  // async addUser(name: string) {
  //   const sql = `INSERT INTO users (name) VALUES (?);`;
  //   await this.db.run(sql, [name]);
  //   // await this.getUsers();
  // }

  // async updateUserById(id: string, active: number) {
  //   const sql = `UPDATE users SET active=${active} WHERE id=${id}`;
  //   await this.db.run(sql);
  //   await this.getUsers();
  // }
  // async deleteUserById(id: string) {
  //   const sql = `DELETE FROM users WHERE id=${id}`;
  //   await this.db.run(sql);
  //   await this.getUsers();
  // }
}
