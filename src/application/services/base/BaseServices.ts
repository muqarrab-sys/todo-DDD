abstract class BaseServices<T = any> {
  protected repository: T;

  constructor(Repository: { new (): T }) {
    this.repository = new Repository();
  }
}

export default BaseServices;
