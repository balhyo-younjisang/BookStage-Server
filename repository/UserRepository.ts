import { DB } from "../db/Connection";
import { IUserDocument, User } from "../db/Schema/UserSchema";
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
    try {
      await DB.connect();
      await User.create({ ...data });
    } catch (err: unknown) {
      if (err instanceof Error) throw err;
    }
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

  async updateById(email: string, bookName: string): Promise<void | undefined> {
    try {
      await DB.connect();
      // @ts-ignore
      const { finishRead } = await User.findOne({ email });

      await User.findOneAndUpdate(
        { email },
        // @ts-ignore
        {
          finishRead: [...finishRead, { bookName, date: new Date() }],
        },
        { upsert: true }
      );
    } catch (err: unknown) {
      if (err instanceof Error) throw err;
    }
  }

  findAllBooksData = async (email: string) => {
    try {
      await DB.connect();
      const userReadBooks = await User.findOne({ email });

      return userReadBooks;
    } catch (err: unknown) {
      if (err instanceof Error) throw err;
    }
  };
}

export default UserRepository;
