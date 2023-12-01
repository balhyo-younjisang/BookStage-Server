import express, { Application } from "express";
import Loader from "./loader/Loader";
import Routes from "./router";

/** Express 인스턴스를 생성하고 초기화한 후 서버 시작
 * @author Yun jisang
 * @Date 2023.11.31
 * @class ServerApplication
 */
class ServerApplication {
  private _app: Application;
  private _PORT!: string;

  constructor() {
    this._app = express();

    this.registerLoader();
    this._PORT = process.env.PORT!;
    this.registerRoutes();
  }

  registerLoader() {
    new Loader(this._app);
  }

  registerRoutes() {
    new Routes(this._app);
  }

  runServerApplication() {
    this._app.listen(this._PORT, () => {
      console.log(`🚀 Server listening on port ${this._PORT}`);
    });
  }
}

const server = new ServerApplication();
server.runServerApplication();
