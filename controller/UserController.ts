import { hashing } from "../utils/Bcrypt";
import { Request, Response } from "express";
import UserRepository from "../repository/UserRepository";
import { IUserDocument } from "../db/Schema/UserSchema";

/** 요청을 받아 유저 레포지토리와 연결 및 비즈니스 로직을 수행하기 위한 객체
 * @author Yun jisang
 * @date 2023.12.01
 * @class UserController
 */
class UserController {
  private _userRepository: UserRepository;

  constructor() {
    this._userRepository = new UserRepository();
  }

  postLoginHandler = async (req: Request, res: Response) => {
    const { email, password } = req.body;
    const userData = await this._userRepository.findByEmail(email);

    if (!userData) return res.status(409).json({ msg: "Failed Login" });

    return res.status(200).json({ msg: "Success Login", data: userData });
  };

  postJoinHandler = async (req: Request, res: Response) => {
    const { email, password } = req.body;

    const hashedPassword = await hashing(password);

    const UserData: IUserDocument = {
      email,
      password: hashedPassword,
    };
    await this._userRepository.create(UserData);

    return res.status(200).json({ msg: "Success join" });
  };
}

export default UserController;
