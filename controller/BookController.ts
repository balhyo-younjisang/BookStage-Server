import { Request, Response } from "express";
import BookRepository from "../repository/BookRepository";
import Controller from "./Controller";

/** 네이버 API와 연결하여 비즈니스 로직을 수행하는 객체
 *  @author Yun jisang
 *  @date 2023.12.02
 *  @class BookController
 */
class BookController extends Controller<BookRepository> {
  constructor() {
    super(new BookRepository());
  }

  postSearchBookOneHandler = async (req: Request, res: Response) => {
    const { bookName } = req.body;
    const bookData = await this._repository.findById(bookName);

    return res.status(200).json({ msg: "Success book search", data: bookData });
  };

  postSearchBookAllHandler = async (req: Request, res: Response) => {
    const { bookName } = req.body;
    const booksData = await this._repository.findAll(bookName);

    return res
      .status(200)
      .json({ msg: "Success books search", data: booksData });
  };
}

export default BookController;
