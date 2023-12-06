import BookController from "../controller/BookController";
import Router from "./Router";

/**  /book 경로로 들어오는 요청을 받아 컨트롤러와 연결하기 위한 객체
 * @author Yun jisang
 * @date 2023.12.01
 * @class UserRouter
 */
class BookRouter extends Router<BookController> {
  constructor() {
    super(new BookController());
  }

  registerRoutes() {
    this._router
      .route("/search")
      .post(this._controller.postSearchBookOneHandler);
    this._router
      .route("/search/all")
      .post(this._controller.postSearchBookAllHandler);
    this._router
      .route("/recommend")
      .get(this._controller.getRecommendBooksHandler);
    this._router
      .route("/librarian")
      .get(this._controller.getLibrarianRecommendBooksHandler);
  }

  get router() {
    return this._router;
  }
}

export default BookRouter;
