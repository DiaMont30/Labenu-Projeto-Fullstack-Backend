import { CustomError } from "../error/CustomError";

export class Image {
  constructor(
    public readonly id: string,
    public readonly subtitle: string,
    public readonly author_id: string,
    public readonly date: string,
    public readonly file: string,
    public readonly collection: string,
    public readonly tags: string[]
  ) {}
}

export interface ImageDB {
  id: string;
  subtitle: string;
  author_id: string;
  date: string;
  file: string;
  collection: string;
  tags: string[];
}

export interface ImageInputDTO {
  subtitle: string;
  author_id: string;
  file: string;
  collection: string;
  tags: string[];
  token: string;
}

export interface ImageOutputDTO {
  id: string;
  subtitle: string;
  author_id: string;
  date: string;
  file: string;
  collection: string;
  tags: string[];
}

export interface GetImgInputDTO {
  id: string;
  token: string;
}

export interface TagInputDTO {
  name: string;
  token: string;
}