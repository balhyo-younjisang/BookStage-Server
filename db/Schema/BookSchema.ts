export interface IBookDocument {
  title: string; // 책제목
  link: string; // 도서 정보 url
  image: string; // 섬네일 이미지 url
  author: string; // 저자 이름
  publisher: string; // 출판사
  description: string; // 책 소개
  pubdate: Date; // 출간일
}
