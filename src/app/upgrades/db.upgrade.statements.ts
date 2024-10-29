export class DBUpgradeStatements {
  tripUpgrades = [
    {
      toVersion: 1,
      statements: [
        `CREATE TABLE IF NOT EXISTS trips(
          tripId INTEGER PRIMARY KEY AUTOINCREMENT,
          label TEXT NOT NULL,
          flueCount INTEGER NOT NULL,
          addBlueCount INTEGER NOT NULL,
          odometrCount INTEGER NOT NULL,
          startDate INTEGER NOT NULL,
          endDate INTEGER 
          );`,
        `CREATE TABLE IF NOT EXISTS formuls(
          formulaId INTEGER PRIMARY KEY AUTOINCREMENT,
          flueCount INTEGER DEFAULT 0,
          distance INTEGER NOT NULL,
          weight INTEGER NOT NULL,
          coefficient INTEGER NOT NULL,
          tripId INTEGER NOT NULL,
           FOREIGN KEY(tripId) REFERENCES trip(tripId),
          );`,
      ],
    },
    // {
    //   toVersion: 2,
    //   statements: [`ALTER TABLE users ADD COLUMN email TEXT;`],
    // },
  ];
}
