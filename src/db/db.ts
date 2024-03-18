import {
    SQLiteDatabase,
    enablePromise,
    openDatabase,
  } from "react-native-sqlite-storage"
  
  // Enable promise for SQLite
  enablePromise(true)
  
  export const connectToDatabase = async () => {
    return openDatabase(
      { name: "yourProjectName.db", location: "default" },
      () => {},
      (error) => {
        console.error(error)
        throw Error("Could not connect to database")
      }
    )
  }
  
  export const createTables = async (db: SQLiteDatabase) => {
    const userPreferencesQuery = `
      CREATE TABLE IF NOT EXISTS UserPreferences (
          id INTEGER DEFAULT 1,
          colorPreference TEXT,
          languagePreference TEXT,
          PRIMARY KEY(id)
      )
    `
    const contactsQuery = `
     CREATE TABLE IF NOT EXISTS Contacts (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        firstName TEXT,
        name TEXT,
        phoneNumber TEXT
     )
    `
    try {
      await db.executeSql(userPreferencesQuery)
      await db.executeSql(contactsQuery)
    } catch (error) {
      console.error(error)
      throw Error(`Failed to create tables`)
    }
  }
  