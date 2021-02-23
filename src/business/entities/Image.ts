import { CustomError } from "../error/CustomError";

export class Image {
  constructor(
    public readonly id: string,
    public readonly subtitle: string,
    public readonly date: Date,
    public readonly file: string,
    public readonly tags: string,
    public readonly collection: string
  ) {}
}

export interface ImageDB {
  id: string;
  subtitle: string;
  date: Date;
  file: string;
  tags: string;
  collection: string;
}

export interface ImageInputDTO {
  subtitle: string;
  date: Date;
  file: string;
  tags: string;
  collection: string;
  token: string;
}
