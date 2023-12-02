import { NextFunction, Request, Response } from "express";
import JwtService from "../utils/JwtService";

const checkTokenFromRequest = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const userIdFromToken = JwtService.getUserIdFromRequest(req);
  // @ts-ignore
  req.userEmail = userIdFromToken; // express.d.ts가 적용이 되지 않아 ignore
  next();
};

export { checkTokenFromRequest };
