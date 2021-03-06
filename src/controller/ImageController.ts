import { Request, Response } from "express";
import { ImageBusiness } from "../business/ImageBusiness";
import {
  Image,
  ImageInputDTO,
  GetImgInputDTO,
  TagInputDTO,
} from "../business/entities/Image";
import { Authenticator } from "../business/services/Authenticator";
import { IdGenerator } from "../business/services/IdGenerator";
import { ImageDatabase } from "../data/ImageDatabase";

const imageBusiness = new ImageBusiness(
  new IdGenerator(),
  new Authenticator(),
  new ImageDatabase()
);

export class ImageController {
  public createImage = async (req: Request, res: Response): Promise<void> => {
    try {
      const token: string = req.headers.authorization as string;

      const input: ImageInputDTO = {
        subtitle: req.body.subtitle,
        author_id: req.body.author_id,
        file: req.body.file,
        collection: req.body.collection,
        tags: req.body.tags,
        token: token,
      };

      await imageBusiness.createImage(input);

      res.status(201).send("Image registered with success");
    } catch (error) {
      res.status(error.statusCode || 400).send({ error: error.message });
    }
  };

  public getImageById = async (req: Request, res: Response): Promise<void> => {
    try {
      const id = req.params.id;

      const token: string = req.headers.authorization as string;

      const result: GetImgInputDTO = {
        id,
        token,
      };

      const image = await imageBusiness.getImage(result);

      res.status(200).send({ image });
    } catch (error) {
      res.status(error.statusCode || 400).send({ error: error.message });
    }
  };

  public getAllImages = async (req: Request, res: Response): Promise<void> => {
    try {
      const token: string = req.headers.authorization as string;
      const images = await imageBusiness.getAllImages(token);

      res.status(201).send(images);
    } catch (error) {
      res.status(error.statusCode || 400).send({ error: error.message });
    }
  };

  public createTag = async (req: Request, res: Response): Promise<void> => {
    try {
      const newTag: TagInputDTO = {
        name: req.body.name,
        token: req.headers.authorization as string,
      };
      const tags = await imageBusiness.createTag(newTag);
      res.status(201).send({tags: tags});
    } catch (error) {
      res.status(error.statusCode || 400).send({ error: error.message });
    }
  };
}
