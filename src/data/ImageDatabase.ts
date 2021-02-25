import { CustomError } from "../business/error/CustomError";
import { BaseDatabase } from "./BaseDatabase";
import { Image, ImageDB } from "../business/entities/Image";

export class ImageDatabase extends BaseDatabase {
  private static TABLE_NAME = "Images_Labegram";

  private static toImageModel(image: Image): Image {
    return new Image(
      image.id,
      image.subtitle,
      image.author_id,
      image.date,
      image.file,
      image.collection,
      image.tags
    );
  }

  public insertImage = async (image: ImageDB): Promise<void> => {
    try {
      await BaseDatabase.connection
        .insert({
          id: image.id,
          subtitle: image.subtitle,
          author_id: image.author_id,
          date: image.date,
          file: image.file,
          collection: image.collection,
        })
        .into(ImageDatabase.TABLE_NAME);

      for (let i = 0; i < image.tags.length; i++) {
        const id = await BaseDatabase.connection
          .select("id")
          .from("tags_Labegram")
          .where("name", `${image.tags[i]}`);
        await BaseDatabase.connection
          .insert({
            image_id: image.id,
            tag_id: id[0].id,
          })
          .into("image_tags_Labegram");
      }
    } catch (error) {
      throw new CustomError(error.statusCode, error.sqlMessage);
    }
  };

  public selectImage = async (id: string): Promise<Image[]> => {
    try {
      const result = await BaseDatabase.connection.raw(`
        SELECT il.id as id, subtitle, author_id, date, file, collection, name as tags FROM ${ImageDatabase.TABLE_NAME} il
        LEFT JOIN image_tags_Labegram itl ON il.id = itl.image_id
        LEFT JOIN tags_Labegram tl ON tl.id = itl.tag_id
        WHERE image_id = "${id}"
    `);
      return result[0];
    } catch (error) {
      throw new CustomError(error.statusCode, error.sqlMessage);
    }
  };

  public selectAllImages = async (): Promise<Image[]> => {
    try {
      const result = await BaseDatabase.connection.raw(`
        SELECT il.id as id, subtitle, author_id, date, file, collection, name as tag FROM ${ImageDatabase.TABLE_NAME} il
        LEFT JOIN image_tags_Labegram itl ON il.id = itl.image_id
        JOIN tags_Labegram tl ON tl.id = itl.tag_id;
      `)
      return result[0];
    } catch (error) {
      throw new Error(error.message || error.sqlMessage);
    }
  };

  public insertTag = async (name: string[]): Promise<void> => {
      try {
          for(let i=0; i<name.length; i++){
              await BaseDatabase.connection.raw(`
              INSERT INTO tags_Labegram (name) VALUES ("${name[i]}");
              `)

            //   .insert({name: name[i]})
            //   .into("tags_Labegram");
          }
          console.log(name[0])
      } catch (error) {
        throw new Error(error.message || error.sqlMessage);
      }
  }
}
