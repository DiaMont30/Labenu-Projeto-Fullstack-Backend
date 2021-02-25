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

  public selectImage = async (id: string): Promise<any> => {
    try {
      const result = await BaseDatabase.connection
        .select("*")
        .from(ImageDatabase.TABLE_NAME)
        .where("id", id);

      for (let i = 0; i < result.length; i++) {
        const tags = await BaseDatabase.connection.raw(`
        SELECT name as tag FROM tags_Labegram tl
        LEFT JOIN image_tags_Labegram itl ON tl.id = itl.tag_id
        JOIN ${ImageDatabase.TABLE_NAME} il ON il.id = itl.image_id 
        WHERE il.id = "${id}";
        `);
        const tagMap = tags[0].map((tag: any) => {
          return tag.tag;
        });
        result[i].tags = tagMap;
      }
      return { data: result[0] };
    } catch (error) {
      throw new CustomError(error.statusCode, error.sqlMessage);
    }
  };

  public selectAllImages = async (): Promise<any> => {
    try {
      const result = await BaseDatabase.connection
        .select("*")
        .from(ImageDatabase.TABLE_NAME);

      for (let i = 0; i < result.length; i++) {
        const tags = await BaseDatabase.connection.raw(`
          SELECT name as tag FROM tags_Labegram tl
          LEFT JOIN image_tags_Labegram itl ON tl.id = itl.tag_id
          JOIN ${ImageDatabase.TABLE_NAME} il ON il.id = itl.image_id
          WHERE il.id = "${result[i].id}";
      `  );
        const tagMap = tags[0].map((tag: any) => {
          return tag.tag;
        });
        result[i].tags = tagMap;
      }

      return { result };
    } catch (error) {
      throw new Error(error.message || error.sqlMessage);
    }
  };

  public insertTag = async (name: string): Promise<void> => {
    try {
      const result = await BaseDatabase.connection
      .insert(name)
      .into("tags_Labegram")

    } catch (error) {
      throw new Error(error.message || error.sqlMessage);
    }
  };
}
