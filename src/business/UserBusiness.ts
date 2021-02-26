import { UserInputDTO, LoginInputDTO, UserDB } from "./entities/User";
import { UserDatabase } from "../data/UserDatabase";
import { IdGenerator } from "./services/IdGenerator";
import { HashManager } from "./services/HashManager";
import { Authenticator } from "./services/Authenticator";
import { CustomError } from "./error/CustomError";
import { CheckData } from "./error/CheckData";


export class UserBusiness {

   constructor(
      private idGenerator: IdGenerator,
      private hashManager: HashManager,
      private authenticator: Authenticator,
      private userDatabase: UserDatabase,
   ) { }

   public async createUser(user: UserInputDTO): Promise<string> {
      try {
         const id = this.idGenerator.generate()
         const hashPassword = await this.hashManager.hash(user.password)
         const check = new CheckData();

         check.checkExistenceProperty(user.name, "name");
         check.checkExistenceProperty(user.nickname, "nickname");
         check.checkPasswordFormat(user.password);
         check.checkEmailFormat(user.email);

         const newUser: UserDB = {
            id: id,
            name: user.name,
            nickname: user.nickname,
            email: user.email,
            password: hashPassword,
         }
         await this.userDatabase.insertUser(newUser)

         const accessToken = this.authenticator.generateToken({
            id
         });

         return accessToken
      } catch (error) {
         throw new CustomError(error.statusCode, error.message);
      }
   }

   public async getUserByEmail(user: LoginInputDTO) {
      try {
         const check = new CheckData();
         check.checkPasswordFormat(user.password);
         check.checkEmailFormat(user.email);

         const userFromDB = await this.userDatabase.selectUserByEmail(user.email)
         check.checkExistenceObject(userFromDB, "Invalid credentials");

         const passwordIsCorrect = await this.hashManager.compare(
            user.password,
            userFromDB.password
         )
         check.checkExistenceObject(passwordIsCorrect, "Invalid credentials");

         const accessToken = this.authenticator.generateToken({
            id: userFromDB.id
         })

         return accessToken

      } catch (error) {
         throw new CustomError(error.statusCode, error.message);
      }

   }
}