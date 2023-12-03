import { Application } from "express";
import UserRouter from "./UserRouter";
import BookRouter from "./BookRouter";

class Routes {
  private _userRouter: UserRouter;
  private _bookRouter: BookRouter;

  constructor(app: Application) {
    this._userRouter = new UserRouter();
    this._bookRouter = new BookRouter();

    app.use("/user", this._userRouter.router);
    app.use("/book", this._bookRouter.router);
  }
}

export default Routes;
