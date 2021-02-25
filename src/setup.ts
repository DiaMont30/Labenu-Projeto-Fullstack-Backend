import { BaseDatabase } from "./data/BaseDatabase";

class Setup extends BaseDatabase {
  public async createTables() {
    try {
      await BaseDatabase.connection.raw(`
            CREATE TABLE IF NOT EXISTS Users_Labegram (
            id VARCHAR(255) PRIMARY KEY,
            name VARCHAR(255) NOT NULL,
            nickname VARCHAR(255) NOT NULL UNIQUE,
            email VARCHAR(255) NOT NULL UNIQUE,
            password VARCHAR(255) NOT NULL
            )
        `);

      await BaseDatabase.connection.raw(`
            CREATE TABLE IF NOT EXISTS Images_Labegram (
            id VARCHAR(255) PRIMARY KEY,
            subtitle VARCHAR(255) NOT NULL,
            author_id VARCHAR(255) NOT NULL,
            date DATE NOT NULL,
            file VARCHAR(255) NOT NULL,
            collection VARCHAR(255) NOT NULL,
            FOREIGN KEY (author_id) REFERENCES Users_Labegram(id)
            )
        `);

  //FOREIGN KEY AUTHOR COM ID DO USUÁRIO

      await BaseDatabase.connection.raw(`
            CREATE TABLE IF NOT EXISTS tags_Labegram (
            id INT AUTO_INCREMENT PRIMARY KEY,
            name VARCHAR(255) NOT NULL UNIQUE
            )
        `);

      await BaseDatabase.connection.raw(`
            CREATE TABLE IF NOT EXISTS image_tags_Labegram (
            image_id VARCHAR(255) NOT NULL,
            tag_id INT NOT NULL,
            FOREIGN KEY (image_id) REFERENCES Images_Labegram(id),
            FOREIGN KEY (tag_id) REFERENCES tags_Labegram(id)
            )
      `);

      console.log("Setup completed!");
    } catch (error) {
      console.log(error);
    } finally {
      await BaseDatabase.connection.destroy();
    }
  }
}

new Setup().createTables();
