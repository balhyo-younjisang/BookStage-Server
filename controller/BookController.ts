import { DateService } from "./../utils/DateService";
import { Request, Response } from "express";
import BookRepository from "../repository/BookRepository";
import Controller from "./Controller";
import axios from "axios";
import convert from "xml-js";

/** 네이버 API와 연결하여 비즈니스 로직을 수행하는 객체
 *  @author Yun jisang
 *  @date 2023.12.02
 *  @class BookController
 */
class BookController extends Controller<BookRepository> {
  private dateService: DateService;

  constructor() {
    super(new BookRepository());
    this.dateService = new DateService();
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

  getRecommendBooksHandler = async (req: Request, res: Response) => {
    const today = new Date();
    const todayFormatted = this.dateService.toStringByFormatting(today);

    const response = await axios.post(
      `http://data4library.kr/api/hotTrend?authKey=${process.env.LIBRARY_API_KEY}&searchDt=${todayFormatted}`
    );

    console.log(response.data);
  };

  /**
   * 사서 추천 도서 API를 받아와 XML 파일 형식을 JSON 형식으로 바꾸어 return
   * @param req Request
   * @param res Response
   */
  getLibrarianRecommendBooksHandler = async (req: Request, res: Response) => {
    const key = process.env.NATIONAL_LIBRARY_API_KEY;
    const response = await axios.post(
      `https://nl.go.kr/NL/search/openApi/saseoApi.do?key=${key}`
    );

    const result = convert.xml2js(response.data, {
      compact: true,
      captureSpacesBetweenElements: true,
    });

    res.status(200).json({ msg: "Success get data", data: result });
  };

  getLibraryLocationHandler = async (req: Request, res: Response) => {
    const key = process.env.SEOUL_DATA_API_KEY;
    const response = await axios.get(
      `http://openapi.seoul.go.kr:8088/${key}/json/SeoulPublicLibraryInfo/1/100/`
    );

    res.status(200).json({
      msg: "Success get data",
      data: response.data.SeoulPublicLibraryInfo.row,
    });
  };
}

export default BookController;
