import { Jwt } from "./../node_modules/@types/jsonwebtoken/index.d";
import { Request } from "express";
import { IUserDocument } from "../db/Schema/UserSchema";
import jwt from "jsonwebtoken";

/** JWT를 사용하기 위한 객체
 * @author Yun jisang
 * @date 2023.12.02
 * @class JwtService
 * @static
 */
class JwtService {
  /** 사용자의 요청으로부터 토큰을 추출해 해독하여 사용자의 데이터를 저장
   * @author Yun jisang
   * @date 2023.12.02
   * @method getUserIdFromRequest
   * @param req Express Request 객체
   * @returns 토큰으로부터 추출한 사용자 데이터 혹은 null
   */
  static getUserIdFromRequest = (req: Request): string | null => {
    const token = this.extractTokenFromRequest(req);
    if (!token) return null;

    const jwtPayload = this.decodeJWT(token);
    return (jwtPayload as any)?._email || null;
  };

  /** 사용자의 요청으로부터 토큰을 추출해 반환
   * @author Yun jisang
   * @date 2023.12.02
   * @method extractTokenFromRequest
   * @param req Experss Request 객체
   * @returns 사용자 요청 (Request)로부터 추출한 토큰
   */
  static extractTokenFromRequest(req: Request) {
    const prefix = "Bearer ";
    const auth = req.headers.authorization;
    const token = auth?.includes(prefix) ? auth.split(prefix)[1] : auth;

    return token;
  }

  /** 사용자의 요청으로부터 받은 토큰을 해독하여 반환
   * @author Yun jisang
   * @date 2023.12.02
   * @method decodeJWT
   * @param token 사용자의 요청으로부터 추출한 토큰문자열
   * @returns 해독된 문자열 혹은 JwtPayload
   */
  static decodeJWT(token: string) {
    try {
      return jwt.verify(token, process.env.JWT_SECRET!);
    } catch {
      return null;
    }
  }

  /** IUserDocument의 사용자 이메일을 사용하여 jwt 생성
   * @author Yun jisang
   * @date 2023.12.02
   * @method createJWT
   * @param user IUserDocument
   * @returns 생성된 토큰
   */
  static createJWT = async (user: IUserDocument): Promise<string> => {
    return jwt.sign({ _email: user.email }, process.env.JWT_SECRET!);
  };
}

export default JwtService;
