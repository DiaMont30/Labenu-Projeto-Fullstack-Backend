import { BaseDatabase } from "./BaseDatabase";
import { User, UserDB } from "../business/entities/User";
import { CustomError } from "../business/error/CustomError";

export class UserDatabase extends BaseDatabase {
  private static TABLE_NAME = "Users_Labegram";

  private static toUserModel(user: User): User {
    return new User(
      user.id,
      user.name,
      user.nickname,
      user.email,
      user.password,
    );
  }

  public insertUser = async (user: UserDB): Promise<void> => {
    try {
      await BaseDatabase.connection
      .insert({
        id: user.id,
        name: user.name,
        nickname: user.nickname,
        email: user.email,
        password: user.password
      })
      .into(UserDatabase.TABLE_NAME);
    } catch (error) {
      throw new CustomError(error.statusCode, error.sqlMessage);
    }
  };

  public selectUserByEmail = async (email: string): Promise<User> => {
    try {
      const result = await BaseDatabase.connection
        .select("*")
        .from(UserDatabase.TABLE_NAME)
        .where({email});

      return UserDatabase.toUserModel(result[0]);
    } catch (error) {
      throw new CustomError(error.statusCode, error.sqlMessage);
    }
  };
}
