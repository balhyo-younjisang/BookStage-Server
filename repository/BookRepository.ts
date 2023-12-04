import { IBookDocument } from "../db/Schema/BookSchema";
import { createToBookDocument } from "../utils/BookService";
import Repository from "./Repository";
import axios from "axios";

class BookRepository extends Repository<IBookDocument> {
  private apiUrl: string;

  constructor() {
    super();
    this.apiUrl = "https://openapi.naver.com/v1/search/book.json";
  }

  async findById(id: string): Promise<IBookDocument | undefined> {
    const searchApiResponse = await axios.get(this.apiUrl, {
      params: {
        query: id,
        display: 1,
        sort: "sim",
      },
      headers: {
        "X-Naver-Client-Id": process.env.NAVER_CLIENT_ID,
        "X-Naver-Client-Secret": process.env.NAVER_CLIENT_SECRET,
      },
    });

    return createToBookDocument(searchApiResponse.data.items[0]);
  }

  async findAll(id: string): Promise<IBookDocument[] | undefined> {
    const books: IBookDocument[] = [];

    const searchApiResponse = await axios.get(this.apiUrl, {
      params: {
        query: id,
        display: 100,
        sort: "sim",
      },
      headers: {
        "X-Naver-Client-Id": process.env.NAVER_CLIENT_ID,
        "X-Naver-Client-Secret": process.env.NAVER_CLIENT_SECRET,
      },
    });

    searchApiResponse.data.items.map((data: any) => {
      const bookDocument = createToBookDocument(data);
      books.push(bookDocument);
    });

    return books;
  }

  deleteById(id: string): Promise<void | undefined> {
    throw new Error("Method not implemented.");
  }

  updateById(id: string): Promise<void | undefined> {
    throw new Error("Method not implemented.");
  }
}

export default BookRepository;
