import { Router } from "express";
import UserController from "../controller/UserController";

/**  /user 경로로 들어오는 요청을 받아 컨트롤러와 연결하기 위한 객체
 * @author Yun jisang
 * @date 2023.12.01
 * @class UserRouter
 */
class UserRouter {
  private _userController: UserController; // 컨트롤러 인스턴스를 담을 객체변수
  private _router: Router; // 라우팅 설정을 하기 위한 변수

  constructor() {
    this._router = Router(); // 라우터 객체 생성
    this._userController = new UserController(); // 유저 컨트롤러 객체 생성

    this.registerUserRoutes(); // 라우팅
  }

  registerUserRoutes() {
    this._router.route("/join").post(this._userController.postJoinHandler);
    this._router.route("/login").post(this._userController.postLoginHandler);
  }

  get router() {
    return this._router;
  }
}

export default UserRouter;
