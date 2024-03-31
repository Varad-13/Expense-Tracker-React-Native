import { SQLiteDatabase, ResultSet } from 'react-native-sqlite-storage';
import { Card, Bank, Account, Transaction } from './types';

export const createCard = async (db: SQLiteDatabase, card: Card) => {
  const insertQuery = `
    INSERT INTO card (nickname, holderName, cardType, cardProvider, bankName, validity, cardNumber, CVV, limits)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?);
  `;

  try {
    await db.executeSql(insertQuery, [
      card.nickname,
      card.holderName,
      card.cardType,
      card.cardProvider,
      card.bankName,
      card.validity,
      card.cardNumber,
      card.CVV,
      card.limits,
    ]);
    console.log('Card created successfully');
  } catch (error) {
    console.error('Error creating card:', error);
    throw new Error('Failed to create card');
  }
};

export const createBank = async (db: SQLiteDatabase, bank: Bank) => {
  const insertQuery = `
    INSERT INTO bank (nickname, holderName, accountType, accountNumber, limits, balance)
    VALUES (?, ?, ?, ?, ?, ?);
  `;

  try {
    await db.executeSql(insertQuery, [
      bank.nickname,
      bank.holderName,
      bank.accountType,
      bank.accountNumber,
      bank.limits,
      bank.balance,
    ]);
    console.log('Bank created successfully');
  } catch (error) {
    console.error('Error creating bank:', error);
    throw new Error('Failed to create bank');
  }
};

export const createAccount = async (db: SQLiteDatabase, account: Account) => {
  const insertQuery = `
    INSERT INTO account (cardNumber, holderName, accountNumber)
    VALUES (?, ?, ?);
  `;

  try {
    await db.executeSql(insertQuery, [account.cardNumber, account.holderName, account.accountNumber]);
    console.log('Account created successfully');
  } catch (error) {
    console.error('Error creating account:', error);
    throw new Error('Failed to create account');
  }
};

export const createTransaction = async (db: SQLiteDatabase, transaction: Transaction) => {
  const insertQuery = `
    INSERT INTO transaction (amount, timestamp, date, category, type, accountId)
    VALUES (?, ?, ?, ?, ?, ?);
  `;

  try {
    await db.executeSql(insertQuery, [
      transaction.amount,
      transaction.timestamp,
      transaction.date,
      transaction.category,
      transaction.type,
      transaction.accountId,
    ]);
    console.log('Transaction created successfully');
  } catch (error) {
    console.error('Error creating transaction:', error);
    throw new Error('Failed to create transaction');
  }
};

export const getCardById = async (db: SQLiteDatabase, cardId: string): Promise<Card | null> => {
  const selectQuery = `
    SELECT * FROM card WHERE cardNumber = ?;
  `;

  try {
    const [result] = await db.executeSql(selectQuery, [cardId]);
    if (result.rows.length > 0) {
      const cardRow = result.rows.item(0);
      const card: Card = {
        nickname: cardRow.nickname,
        holderName: cardRow.holderName,
        cardType: cardRow.cardType,
        cardProvider: cardRow.cardProvider,
        bankName: cardRow.bankName,
        validity: cardRow.validity,
        cardNumber: cardRow.cardNumber,
        CVV: cardRow.CVV,
        limits: cardRow.limits,
      };
      return card;
    } else {
      return null;
    }
  } catch (error) {
    console.error('Error getting card by ID:', error);
    throw new Error('Failed to get card by ID');
  }
};

// Add more CRUD operations as needed for your application
