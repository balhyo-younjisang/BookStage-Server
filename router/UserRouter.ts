import Router from "./Router";
import UserController from "../controller/UserController";
import { checkTokenFromRequest } from "../middleware/TokenMiddleware";

/**  /user 경로로 들어오는 요청을 받아 컨트롤러와 연결하기 위한 객체
 * @author Yun jisang
 * @date 2023.12.01
 * @class UserRouter
 */
class UserRouter extends Router<UserController> {
  constructor() {
    super(new UserController());
  }

  registerRoutes() {
    this._router.route("/join").post(this._controller.postJoinHandler);
    this._router.route("/login").post(this._controller.postLoginHandler);
    this._router
      .route("/finish")
      .post(checkTokenFromRequest, this._controller.postFinishReadHandler);
    this._router
      .route("/summary")
      .get(checkTokenFromRequest, this._controller.getSummaryHandler);
  }

  get router() {
    return this._router;
  }
}

export default UserRouter;
