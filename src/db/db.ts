import { SQLiteDatabase, enablePromise, openDatabase } from 'react-native-sqlite-storage';

// Enable promise for SQLite
enablePromise(true);

export const connectToDatabase = async () => {
  try {
    const db = await openDatabase({ name: 'ex.db', location: 'default' });
    console.log('Database connection successful:', db);
    return db;
  } catch (error) {
    console.error('Error opening database:', error);
    throw new Error('Could not connect to database');
  }
};

export const createTables = async (db: SQLiteDatabase) => {
  const cardQuery = `
    CREATE TABLE IF NOT EXISTS card (
      nickname TEXT,
      holderName TEXT,
      cardType TEXT,
      cardProvider TEXT,
      bankName TEXT,
      validity TEXT,
      cardNumber TEXT PRIMARY KEY,
      CVV TEXT,
      limits INTEGER,
      FOREIGN KEY (bankName) REFERENCES bank(holderName)
    );
  `;

  const bankQuery = `
    CREATE TABLE IF NOT EXISTS bank (
      nickname TEXT,
      holderName TEXT,
      accountType TEXT,
      accountNumber TEXT PRIMARY KEY,
      limits INTEGER,
      balance REAL
    );
  `;

  const accountQuery = `
    CREATE TABLE IF NOT EXISTS account (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      cardNumber TEXT,
      holderName TEXT,
      accountNumber TEXT,
      FOREIGN KEY (cardNumber) REFERENCES card(cardNumber),
      FOREIGN KEY (holderName) REFERENCES bank(holderName)
    );
  `;

  const transactionQuery = `
    CREATE TABLE IF NOT EXISTS transaction (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      amount REAL,
      timestamp TEXT,
      date TEXT,
      category TEXT,
      type TEXT,
      accountId INTEGER,
      FOREIGN KEY (accountId) REFERENCES account(id)
    );
  `;

  try {
    await db.transaction(async (tx) => {
      await tx.executeSql(cardQuery);
      await tx.executeSql(bankQuery);
      await tx.executeSql(accountQuery);
      await tx.executeSql(transactionQuery);
    });
    console.log('Tables created successfully');
  } catch (error) {
    console.error('Error creating tables:', error);
    throw new Error('Failed to create tables');
  }
};