import { Application } from "express";
import { checkTokenFromRequest } from "./TokenMiddleware";

/** 추가로 작성된 미들웨어를 등록하기 위한 클래스
 * @author Yun jisang
 * @date 2023.12.02
 * @class customMiddleware
 */
class customMiddleware {
  private _app: Application;

  constructor(app: Application) {
    this._app = app;

    this.registerMiddlewares();
  }

  registerMiddlewares = () => {
    this._app.use(checkTokenFromRequest); // 사용자의 요청으로부터 토큰을 추출해 아이디 ( 이메일 )을 얻기 위한 미들웨어
  };
}

export default customMiddleware;
