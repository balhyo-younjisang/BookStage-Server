import { MongoServerError } from "mongodb";
import { checking, hashing } from "../utils/BcryptService";
import { Request, Response } from "express";
import UserRepository from "../repository/UserRepository";
import { IUserDocument } from "../db/Schema/UserSchema";
import JwtService from "../utils/JwtService";
import Controller from "./Controller";
import { IBook } from "../db/Schema/BookSchema";
import { DateService } from "../utils/DateService";

/** 요청을 받아 유저 레포지토리와 연결 및 비즈니스 로직을 수행하기 위한 객체
 * @author Yun jisang
 * @date 2023.12.01
 * @class UserController
 */
class UserController extends Controller<UserRepository> {
  constructor() {
    super(new UserRepository());
  }

  postLoginHandler = async (req: Request, res: Response) => {
    const { email, password } = req.body;

    const userData = await this._repository.findByEmail(email);
    if (!userData) return res.status(404).json({ msg: "Not found User" });

    const confirmPassword = await checking(password, userData.password);
    if (!confirmPassword)
      return res.status(400).json({ msg: "Password is not correct" });

    const createdToken = await JwtService.createJWT(userData);
    return res.status(200).json({ msg: "Success Login", data: createdToken });
  };

  postJoinHandler = async (req: Request, res: Response) => {
    try {
      const { email, password } = req.body;
      const hashedPassword = await hashing(password);
      const UserData: IUserDocument = {
        email,
        password: hashedPassword,
        finishRead: [],
      };

      await this._repository.create(UserData);
      return res.status(200).json({ msg: "Success join" });
    } catch (err: unknown) {
      if (err instanceof Error && err.name === "MongoServerError") {
        const mongoError = err as MongoServerError;
        switch (mongoError.code) {
          case 11000:
            return res.status(409).json({ msg: "Email is already exists" });
        }
      }
    }
  };

  postFinishReadHandler = async (req: Request, res: Response) => {
    try {
      const { bookName } = req.body;
      // @ts-ignore
      const email = req.userEmail;

      await this._repository.updateById(email!, bookName);
      return res.status(200).json({ msg: "Success update" });
    } catch (err: unknown) {
      console.log(err);
    }
  };

  getSummaryHandler = async (req: Request, res: Response) => {
    try {
      const { period } = req.query;
      // @ts-ignore
      const email = req.userEmail;
      const date = new DateService();
      const periodDate = date.getDateByPeriod(period!.toString());

      const booksData = await this._repository.findAllBooksData(email!);

      if (!!booksData!.finishRead) {
        const booksList: [string, IBook][] = Object.entries(
          booksData!.finishRead
        );
        const filtering = booksList.filter(
          (book) => book[1].date > periodDate!
        );

        // todo : 통계 후 반환
        res.status(200).json({ msg: "Success get data", data: filtering });
      }

      res.status(200).json({ msg: "Success get data", data: null });
    } catch (err: unknown) {
      console.log(err);
    }
  };
}

export default UserController;
