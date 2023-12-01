import mongoose from "mongoose";

/** DB에 접근하여 CRUD하는 역할
 * @author Yun jisang
 * @Date 2023.12.01
 * @abstract
 * @class Repository<T> / T : mongodb Document 인터페이스
 */
abstract class Repository<T> {
  /** 문자열을 인자로 받아 해당 문자열을 가지고 있는 데이터를 DB Collection에서 찾아 데이터 전체 반환
   * @author Yun jisang
   * @Date 2023.12.01
   * @abstract
   * @param id DB에서 찾을 데이터의 _id , string
   * @returns Promise<T | undefined>
   */
  abstract findById(id: string): Promise<T | undefined>;

  /** DB Collection에 존재하는 데이터를 모두 가지고 와 배열 형태로 반환
   * @author Yun jisang
   * @Date 2023.12.01
   * @abstract
   * @returns Promise<T[]>
   */
  abstract findAll(): Promise<T[] | undefined>;

  /** 문자열을 인자로 받아 해당 문자열을 가지고 있는 데이터를 DB Collection에서 찾아 데이터 삭제
   * @author Yun jisang
   * @Date 2023.12.01
   * @abstract
   * @param id DB에서 찾을 데이터의 _id , string
   * @returns Promise<void>
   */
  abstract deleteById(id: string): Promise<void | undefined>;

  /** 데이터를 받아 DB Collection에 생성
   * @author Yun jisang
   * @Date 2023.12.01
   * @abstract
   * @param data DB에 생성할 데이터
   * @returns Promise<void>
   */
  abstract create(data: T): Promise<void | undefined>;

  // 추가되는 인자들과 속성값을 만들 수 있도록
  [x: string]: any;
}

export default Repository;
