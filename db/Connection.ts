// import { Db, MongoClient } from "mongodb";
import mongoose, { Connection } from "mongoose";

/** MongoDB 관리
 * @author Yun jisang
 * @Date 2023.12.01
 * @class DB
 */
export class DB {
  /** MongoDB 서버에 연결한 후 BookState 콜렉션에 접근
   * @author Yun jisang
   * @Date 2023.12.01
   * @method connect()
   * @static
   * @returns Promise<Db>
   */
  static async connect(): Promise<Connection> {
    const client = await mongoose.connect(process.env.DB_URL!);
    return client.connection;
  }
}
