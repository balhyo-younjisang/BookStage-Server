import express from "express";

abstract class Router<C> {
  protected _router: express.Router;
  protected _controller: C;

  constructor(controller: C) {
    this._controller = controller;
    this._router = express.Router();
    this.registerRoutes();
  }

  abstract registerRoutes(): void;
}

export default Router;
