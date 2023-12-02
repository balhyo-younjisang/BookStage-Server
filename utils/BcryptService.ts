import bcrypt from "bcrypt";

/** 인자로 받은 문자열을 암호화하기 위한 함수
 * @author Yun jisang
 * @function` hasing
 * @param str 암호화를 할 대상 문자열
 * @returns 암호화된 문자열
 */
export const hashing = async (str: string): Promise<string> => {
  const saltRound = 5;
  const salt = await bcrypt.genSalt(saltRound);
  return await bcrypt.hash(str, salt);
};

/** 암호화된 문자열과 인자로 받은 문자열을 비교해 같다면 true, 아니면 false를 반환하는 함수
 * @author Yun jisang
 * @function checking
 * @param str 암호화된 문자열과 비교할 묹열
 * @param decodeStr 암호화된 문자열
 * @returns
 */
export const checking = async (
  str: string,
  decodeStr: string
): Promise<boolean> => {
  return await bcrypt.compare(str, decodeStr);
};
