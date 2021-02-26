import { LoginInputDTO, UserInputDTO } from "../src/business/entities/User";
import { UserBusiness } from "../src/business/UserBusiness";

describe("Testing Sign Up", () => {
  const idGenerator = { generate: jest.fn() } as any;
  const hashManager = { hash: jest.fn() } as any;
  const authenticator = { generateToken: jest.fn() } as any;
  const userDatabase = { createUser: jest.fn() } as any;

  test("Error when 'name' is empty", async () => {
    expect.assertions(2);
    const userBusiness: UserBusiness = new UserBusiness(
      idGenerator,
      hashManager,
      authenticator,
      userDatabase
    );

    const input: UserInputDTO = {
      name: "",
      nickname: "lindinha",
      email: "test@email.com",
      password: "testando123",
    };

    try {
      await userBusiness.createUser(input);
    } catch (error) {
      expect(error.message).toBe(`'name' property is missing`);
      expect(error.statusCode).toBe(406);
    }
  });

  test("Error when 'nickname' is empty", async () => {
    expect.assertions(2);
    const userBusiness: UserBusiness = new UserBusiness(
      idGenerator,
      hashManager,
      authenticator,
      userDatabase
    );

    const input: UserInputDTO = {
      name: "Lindalva",
      nickname: "",
      email: "test@email.com",
      password: "testando123",
    };

    try {
      await userBusiness.createUser(input);
    } catch (error) {
      expect(error.message).toBe(`'nickname' property is missing`);
      expect(error.statusCode).toBe(406);
    }
  });

  test("Error when 'email' is empty", async () => {
    expect.assertions(2);
    const userBusiness: UserBusiness = new UserBusiness(
      idGenerator,
      hashManager,
      authenticator,
      userDatabase
    );

    const input: UserInputDTO = {
      name: "Lindalva",
      nickname: "lindinha",
      email: "",
      password: "testando123",
    };

    try {
      await userBusiness.createUser(input);
    } catch (error) {
      expect(error.message).toBe(`'email' property is missing`);
      expect(error.statusCode).toBe(406);
    }
  });

  test("Error when 'password' is empty", async () => {
    expect.assertions(2);
    const userBusiness: UserBusiness = new UserBusiness(
      idGenerator,
      hashManager,
      authenticator,
      userDatabase
    );

    const input: UserInputDTO = {
      name: "Lindalva",
      nickname: "lindinha",
      email: "test@email.com",
      password: "",
    };

    try {
      await userBusiness.createUser(input);
    } catch (error) {
      expect(error.message).toBe(`'password' property is missing`);
      expect(error.statusCode).toBe(406);
    }
  });

  test("Error when email is invalid", async () => {
    const userBusiness: UserBusiness = new UserBusiness(
      idGenerator,
      hashManager,
      authenticator,
      userDatabase
    );

    const input: UserInputDTO = {
      name: "Lindalva",
      nickname: "lindinha",
      email: "testemail.com",
      password: "123456",
    };

    try {
      await userBusiness.createUser(input);
    } catch (error) {
      expect(error.message).toBe(
        "check the format of the 'email' property, @ is required"
      );
      expect(error.statusCode).toBe(406);
    }
  });

  test("Error when password is invalid", async () => {
    const userBusiness: UserBusiness = new UserBusiness(
      idGenerator,
      hashManager,
      authenticator,
      userDatabase
    );

    const input: UserInputDTO = {
      name: "Lindalva",
      nickname: "lindinha",
      email: "test@email.com",
      password: "123",
    };

    try {
      await userBusiness.createUser(input);
    } catch (error) {
      expect(error.message).toBe(
        "Password required whith minimum 6 caracteres"
      );
      expect(error.statusCode).toBe(406);
    }
  });

  test("Success case", async () => {
    const userBusiness: UserBusiness = new UserBusiness(
      idGenerator,
      hashManager,
      authenticator,
      userDatabase
    );

    const input: UserInputDTO = {
      name: "Lindalva",
      nickname: "lindinha",
      email: "test@email.com",
      password: "123456",
    };

    try {
      await userBusiness.createUser(input);

      expect(userDatabase.createUser).toHaveBeenCalled();
      expect(userDatabase.createUser).toHaveBeenCalledWith(input);
    } catch (error) {}
  });
});

const getUserByEmailUndefinedMock = jest.fn((email: any): any => {
  return undefined;
});

const getUserByEmailMock = jest.fn((email: any): any => {
  return {
    id: "id",
    name: "test",
    nickname: "test",
    email: "test@email.com",
    password: "testando123",
  };
});

const compareTrue = jest.fn((password: any, hashPassowrd: any): any => {
  return true;
});

const compareFalse = jest.fn((password: any, hashPassowrd: any): any => {
  return false;
});

describe("Testando login", () => {
  const idGenerator = { generate: jest.fn() } as any;
  const hashManagerTrue = { compare: compareTrue } as any;
  const hahsManagerFalse = { compare: compareFalse } as any;
  const authenticator = { generateToken: jest.fn() } as any;
  const userDatabaseTrue = { getUserByEmail: getUserByEmailMock } as any;
  const userDatabaseFalsy = {
    getUserByEmail: getUserByEmailUndefinedMock,
  } as any;

  test("Error when 'email' is empty", async () => {
    const userBusiness: UserBusiness = new UserBusiness(
      idGenerator,
      hashManagerTrue,
      authenticator,
      userDatabaseTrue
    );

    const input: LoginInputDTO = {
      email: "",
      password: "testando123",
    };

    try {
      await userBusiness.getUserByEmail(input);
    } catch (error) {
      expect(error.message).toBe(`'email' property is missing`);
      expect(error.statusCode).toBe(406);
    }
  });

  test("Error when 'password' is empty", async () => {
    const userBusiness: UserBusiness = new UserBusiness(
      idGenerator,
      hashManagerTrue,
      authenticator,
      userDatabaseTrue
    );

    const input: LoginInputDTO = {
      email: "test@email.com",
      password: "",
    };

    try {
      await userBusiness.getUserByEmail(input);
    } catch (error) {
      expect(error.message).toBe(`'password' property is missing`);
      expect(error.statusCode).toBe(406);
    }
  });

  test("Error when 'email' is invalid", async () => {
    const userBusiness: UserBusiness = new UserBusiness(
      idGenerator,
      hashManagerTrue,
      authenticator,
      userDatabaseTrue
    );

    const input: LoginInputDTO = {
      email: "testemail.com",
      password: "testando123",
    };

    try {
      await userBusiness.getUserByEmail(input);
    } catch (error) {
      expect(error.message).toBe(
        "check the format of the 'email' property, @ is required"
      );
      expect(error.statusCode).toBe(406);
    }
  });

  test("Success case", async () => {
    const userBusiness: UserBusiness = new UserBusiness(
      idGenerator,
      hashManagerTrue,
      authenticator,
      userDatabaseTrue
    );

    const input: LoginInputDTO = {
      email: "test@email.com",
      password: "testando123",
    };

    try {
      await userBusiness.getUserByEmail(input);

      expect(userDatabaseTrue.getUserByEmail).toHaveBeenCalled();
      expect(userDatabaseTrue.getUserByEmail).toHaveBeenCalledWith(input.email);
      expect(userBusiness.getUserByEmail).toHaveReturned();
    } catch (error) {}
  });
});
