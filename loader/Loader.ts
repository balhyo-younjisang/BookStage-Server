import bodyParser from "body-parser";
import cors from "cors";
import morgan from "morgan";
import dotenv from "dotenv";

import { Application } from "express";

class Loader {
  private _app: Application;

  constructor(application: Application) {
    this._app = application;

    this.settingForDev();
    this.settingBodyParser();
    this.settingCors();
  }

  settingBodyParser() {
    this._app.use(bodyParser.json());
    this._app.use(bodyParser.urlencoded({ extended: true }));
  }

  settingCors() {
    this._app.use(cors());
  }

  settingForDev() {
    dotenv.config();
    this._app.use(morgan("dev"));
  }
}

export default Loader;
