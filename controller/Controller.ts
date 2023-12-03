abstract class Controller<R> {
  protected _repository: R;

  constructor(repository: R) {
    this._repository = repository;
  }
}

export default Controller;
