export default abstract class BaseSeed<T = any> {
  protected repository: T;

  constructor(repository: T) {
    this.repository = repository;
  }

  abstract execute(num: number): Promise<void>;
}
