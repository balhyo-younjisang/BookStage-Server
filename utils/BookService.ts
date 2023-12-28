import { AxiosResponse } from "axios";
import { IBookDocument } from "../db/Schema/BookSchema";

export const createToBookDocument = (bookData: any): IBookDocument => {
  const createdBookDocument: IBookDocument = {
    title: bookData?.title, // 책제목
    link: bookData?.link, // 도서 정보 url
    image: bookData?.image, // 섬네일 이미지 url
    author: bookData?.author, // 저자 이름
    publisher: bookData?.publisher, // 출판사
    description: bookData?.description, // 책 소개
    pubdate: bookData?.ipubdate, // 출간일
  };

  return createdBookDocument;
};
