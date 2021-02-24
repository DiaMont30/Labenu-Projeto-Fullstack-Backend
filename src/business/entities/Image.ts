import { CustomError } from "../error/CustomError";

export class Image {
  constructor(
    public readonly id: string,
    public readonly subtitle: string,
    public readonly date: string,
    public readonly file: string,
    public readonly tags: string,
    public readonly collection: string
  ) {}
}

export interface ImageDB {
  id: string;
  subtitle: string;
  date: string;
  file: string;
  tags: string;
  collection: string;
}

export interface ImageInputDTO {
  subtitle: string;
  file: string;
  tags: string;
  collection: string;
  token: string;
}

export interface GetImgInputDTO {
  id: string;
  token: string;
}