import { Application } from "express";
import UserRouter from "./UserRouter";

class Routes {
  private _userRouter: UserRouter;

  constructor(app: Application) {
    this._userRouter = new UserRouter();

    app.use("/user", this._userRouter.router);
  }
}

export default Routes;
