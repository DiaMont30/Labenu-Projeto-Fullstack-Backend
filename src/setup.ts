import { BaseDatabase } from "./data/BaseDatabase";

class Setup extends BaseDatabase {
  public async createTables() {
    try {
      await BaseDatabase.connection.raw(`
            CREATE TABLE Users_Labegram (
            id VARCHAR(255) PRIMARY KEY,
            name VARCHAR(255) NOT NULL,
            nickname VARCHAR(255) NOT NULL UNIQUE,
            email VARCHAR(255) NOT NULL UNIQUE,
            password VARCHAR(255) NOT NULL
            )
        `);

      await BaseDatabase.connection.raw(`
            CREATE TABLE Images_Labegram (
            id VARCHAR(255) PRIMARY KEY,
            subtitle VARCHAR(255) NOT NULL,
            date DATE NOT NULL,
            file VARCHAR(255) NOT NULL,
            tags VARCHAR(255) NOT NULL,
            collection VARCHAR(255) NOT NULL 
            )
        `);

      await BaseDatabase.connection.raw(`
            CREATE TABLE tags_Labegram (
            id VARCHAR(255) PRIMARY KEY,
            image_id VARCHAR(255) NOT NULL,
            FOREIGN KEY(image_id) REFERENCES Images_Labegram(id)
            )
        `);

      console.log("Setup completed!");
    } catch (error) {
      console.log(error);
    }
  }
}

new Setup().createTables();
