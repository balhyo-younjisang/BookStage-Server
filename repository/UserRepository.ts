import { MongoServerError } from "mongodb";
import { DB } from "../db/Connection";
import { IUserDocument, User } from "../db/Schema/UserSchema";
import JwtService from "../utils/JwtService";
import Repository from "./Repository";

/** users collection에 직접적으로 접근하기 위한 객체
 * @author Yun jisang
 * @date 2023.12.01
 * @class UserRepository
 */
class UserRepository extends Repository<IUserDocument> {
  findById = async (id: string): Promise<IUserDocument | undefined> => {
    try {
      await DB.connect();
      const UserData = await User.findById({ id });

      if (!UserData) throw Error("Not found");
      return UserData;
    } catch (err: unknown) {
      if (err instanceof Error) throw err;
    }
  };

  findAll = async (): Promise<IUserDocument[] | undefined> => {
    try {
      await DB.connect();
      const userDatas = await User.find({});
      return userDatas;
    } catch (err: unknown) {
      if (err instanceof Error) throw err;
    }
  };

  deleteById = async (id: string): Promise<void> => {
    try {
      await DB.connect();
      await User.deleteOne({ _id: id });
    } catch (err: unknown) {
      if (err instanceof Error) throw err;
    }
  };

  create = async (data: IUserDocument): Promise<void> => {
    await DB.connect();
    await User.create(data);
  };

  async findByEmail(email: string): Promise<IUserDocument | undefined> {
    try {
      await DB.connect();
      const userData = await User.findOne({ email });
      if (!userData) throw Error("Not found");
      return userData;
    } catch (err: unknown) {
      if (err instanceof Error) throw err;
    }
  }
}

export default UserRepository;
