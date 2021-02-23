import { CustomError } from "./CustomError";

export class CheckData {
  public checkArray = (array: any, message: string) => {
    if (array.length !== 0) {
      throw new CustomError(401, message);
    }
  };

  public checkEmailFormat = (email: string) => {
    this.checkExistenceProperty(email, "email");
    if (email.indexOf("@") === -1) {
      throw new CustomError(
        406,
        "check the format of the 'email' property, @ is required"
      );
    }
  };

  public checkExistenceProperty = (reqPropety: any, propretyName: string) => {
    if (!reqPropety || reqPropety === undefined) {
      throw new CustomError(406, `'${propretyName}' not found`);
    }
  };

  public checkExistenceObject = (reqObject: any, message: string) => {
    if (!reqObject || reqObject === undefined) {
      throw new CustomError(404, `'${message}'`);
    }
  };

  public checkPasswordFormat = (password: string) => {
    this.checkExistenceProperty(password, "password");
    if (password.length < 6) {
      throw new CustomError(
        406,
        " is password required whith minimum 6 caracteres"
      );
    }
  };
}
