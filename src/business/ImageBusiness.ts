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

  public getImage = async (input: GetImgInputDTO): Promise<Image[]> => {
    try {
      const result = await this.imageDatabase.selectImage(input.id);
      const tokenData: AuthenticationData = this.authenticator.getData(
        input.token
      );

      const check = new CheckData();
      check.checkExistenceObject(result, "Image not found");

      return result;
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
      const tokenData: AuthenticationData = this.authenticator.getData(input.token);
      const tags = input.name

      const check = new CheckData();
      check.checkExistenceProperty(input.name, "name");
      check.checkExistenceProperty(input.token, "token");
      
      await this.imageDatabase.insertTag(tags)

      return(tags)
    } catch (error) {
      throw new CustomError(error.statusCode, error.message);
    }
  };
}
