import { MongoServerError } from "mongodb";
import { checking, hashing } from "../utils/BcryptService";
import { Request, Response } from "express";
import UserRepository from "../repository/UserRepository";
import { IUserDocument } from "../db/Schema/UserSchema";
import JwtService from "../utils/JwtService";
import Controller from "./Controller";

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
}

export default UserController;
