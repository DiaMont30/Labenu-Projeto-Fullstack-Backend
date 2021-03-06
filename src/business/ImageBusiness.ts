import { ImageDatabase } from "../data/ImageDatabase";
import { AuthenticationData, User } from "./entities/User";
import { CustomError } from "./error/CustomError";
import { Authenticator } from "./services/Authenticator";
import { IdGenerator } from "./services/IdGenerator";
import {
  Image,
  ImageDB,
  ImageInputDTO,
  GetImgInputDTO,
  TagInputDTO,
  ImageOutputDTO,
} from "./entities/Image";
import { CheckData } from "./error/CheckData";
import dayjs from "dayjs";

export class ImageBusiness {
  constructor(
    private idGenerator: IdGenerator,
    private authenticator: Authenticator,
    private imageDatabase: ImageDatabase
  ) {}

  public createImage = async (input: ImageInputDTO): Promise<void> => {
    try {
      const check = new CheckData();

      check.checkExistenceProperty(input.subtitle, "subtitle");
      check.checkExistenceProperty(input.file, "file");
      check.checkExistenceProperty(input.tags, "tags");
      check.checkExistenceProperty(input.author_id, "author_id");
      check.checkExistenceProperty(input.collection, "collection");
      check.checkExistenceProperty(input.token, "token");

      const tokenData: AuthenticationData = this.authenticator.getData(
        input.token
      );

      const id: string = this.idGenerator.generate();

      const newImage: ImageDB = {
        id: id,
        subtitle: input.subtitle,
        author_id: input.author_id,
        date: dayjs().format("YYYY-MM-DD"),
        file: input.file,
        collection: input.collection,
        tags: input.tags,
      };

      await this.imageDatabase.insertImage(newImage);
    } catch (error) {
      throw new CustomError(error.statusCode, error.message);
    }
  };

  public getImage = async (input: GetImgInputDTO): Promise<any> => {
    try {
      const check = new CheckData();
      check.checkExistenceProperty(input.token, "token");
      check.checkExistenceProperty(input.id, "id");

      const image = await this.imageDatabase.selectImage(input.id);
      const tokenData: AuthenticationData = this.authenticator.getData(
        input.token
      );

      check.checkExistenceObject(image, "Image not found");
    
      const result: ImageOutputDTO = {
        id: image.data.id,
        subtitle: image.data.subtitle,
        author_id: image.data.author_id,
        date: dayjs(image.data.date).format("DD/MM/YYYY"),
        file: image.data.file,
        collection: image.data.collection,
        tags: image.data.tags
      }

      return(result);
    } catch (error) {
      throw new CustomError(error.statusCode, error.message);
    }
  };

  public getAllImages = async (token: string): Promise<Image[]> => {
    try {
      const check = new CheckData();

      const tokenData: AuthenticationData = this.authenticator.getData(token);

      const images = await this.imageDatabase.selectAllImages();
      check.checkArray(images, "No images found");

      return images;
    } catch (error) {
      throw new CustomError(error.statusCode, error.message);
    }
  };

  public createTag = async (input: TagInputDTO): Promise<any> => {
    try {
      const check = new CheckData();
      check.checkExistenceProperty(input.name, "name");
      check.checkExistenceProperty(input.token, "token");

      const tokenData: AuthenticationData = this.authenticator.getData(
        input.token
      );
      const tags = await this.imageDatabase.insertTag(input.name);

      return tags;
    } catch (error) {
      throw new CustomError(error.statusCode, error.message);
    }
  };
}
