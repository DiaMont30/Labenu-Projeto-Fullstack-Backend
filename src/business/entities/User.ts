import { CustomError } from "../error/CustomError";

export class User {
  constructor(
    public readonly id: string,
    public readonly name: string,
    public readonly nickname: string,
    public readonly email: string,
    public readonly password: string
  ) {}
}

export interface UserDB {
    id: string;
    name: string;
    nickname: string;
    email: string;
    password: string;
 }

export interface UserInputDTO {
  name: string;
  nickname: string;
  email: string;
  password: string;
}

export interface LoginInputDTO {
  email: string;
  password: string;
}

export interface AuthenticationData {
  id: string;
}
