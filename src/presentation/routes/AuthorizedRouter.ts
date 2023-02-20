import BaseController from '@presentation/controllers/BaseController';
import BaseRouter, { Call } from './BaseRouter';

abstract class AuthorizedRouter<T = BaseController> extends BaseRouter {
  constructor(private readonly controller: T, private readonly path: string) {
    super(controller, path);
  }

  protected Get: Call = (path, ...handlers) => this.call('get', path, handlers, { secured: true });
  protected Post: Call = (path, ...handlers) => this.call('post', path, handlers, { secured: true });
  protected Put: Call = (path, ...handlers) => this.call('put', path, handlers, { secured: true });
  protected Delete: Call = (path, ...handlers) => this.call('delete', path, handlers, { secured: true });
  protected Patch: Call = (path, ...handlers) => this.call('patch', path, handlers, { secured: true });
}

export default AuthorizedRouter;
