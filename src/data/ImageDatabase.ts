import { CustomError } from "../business/error/CustomError";
import { BaseDatabase } from "./BaseDatabase";
import { Image, ImageDB } from "../business/entities/Image";

export class ImageDatabase extends BaseDatabase {
    private static TABLE_NAME = "Images_Labegram";

    private static toImageModel(image: Image): Image {
        return new Image(
            image.id,
            image.subtitle,
            image.date,
            image.file,
            image.tags,
            image.collection
        )
    }

    public insertImage = async (image: ImageDB): Promise<void> => {
        try {
            await BaseDatabase.connection
                .insert({
                    id: image.id,
                    subtitle: image.subtitle,
                    date: image.date,
                    file: image.file,
                    tags: image.tags,
                    collection: image.collection
                })
                .into(ImageDatabase.TABLE_NAME)

        } catch (error) {
            throw new CustomError(error.statusCode, error.sqlMessage)
        }
    }

    public selectImage = async (id: string): Promise<Image> => {
        try {
            const result = await BaseDatabase.connection
                .select("*")
                .from (ImageDatabase.TABLE_NAME)
                .where('id', id)

            return ImageDatabase.toImageModel(result[0])

        } catch (error) {
            throw new CustomError(error.statusCode, error.sqlMessage)
        }
    }

    public selectAllImages = async(): Promise<Image[]> => {
        try {
            const result = await BaseDatabase.connection
            .select("*")
            .from(ImageDatabase.TABLE_NAME)
            return result
        } catch (error) {
            throw new Error(error.message || error.sqlMessage)
        }
    }
}