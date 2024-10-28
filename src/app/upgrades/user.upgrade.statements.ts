export class UserUpgradeStatements {
  userUpgrades = [
    {
      toVersion: 1,
      statements: [
        `CREATE TABLE IF NOT EXISTS trip(
          tripId INTEGER PRIMARY KEY AUTOINCREMENT,
          name TEXT NOT NULL,
          active INTEGER DEFAULT 1,
          flue TEXT,
          addBlue TEXT,
          startDate INTEGER,
          endDate INTEGER,
          );`,
        `CREATE TABLE IF NOT EXISTS formula(
          formulaId INTEGER PRIMARY KEY AUTOINCREMENT,
          type TEXT NOT NULL,
          tripId,
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
