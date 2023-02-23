// import BaseController from '@/lib/BaseController';
// import authenticationMiddleware from '@/middlewares/authentication.middleware';
import express, { IRouter, RequestHandler } from 'express';
import { isArray } from 'lodash';
import tryCatchWrapper from '@/presentation/middleware/tryCatch.wrapper';
import BaseController from '@presentation/controllers/base/BaseController';

export type RouterClass = { new (): BaseRouter<any> };
export type Methods = 'all' | 'get' | 'post' | 'put' | 'delete' | 'patch' | 'options' | 'head';
export type Call = (path: string, ...handlers: RequestHandler[]) => void;
type CallOptions = {
  secured?: boolean;
};

export default abstract class BaseRouter<T = BaseController> {
  private baseRoute: string;
  protected router: IRouter = express.Router();

  constructor(protected readonly controller: T, protected readonly path: string = '') {
    let baseName = this.constructor.name.replace('Router', '').toLowerCase();
    baseName = baseName === 'index' ? '' : baseName;
    this.baseRoute = path + (path ? `${baseName}` : baseName);

    this.routes();
  }

  protected abstract routes(): void;

  get module(): IRouter {
    return this.router;
  }

  private parseEndPoint(path: string | Array<string>): string {
    const endPoint = [this.baseRoute]
      .concat(isArray(path) ? path : path.split('/'))
      .filter(part => part !== '')
      .join('/');

    return `/${endPoint}`;
  }

  protected call(method: Methods, path: string, handlers: RequestHandler[], options?: CallOptions): void {
    handlers[handlers.length - 1] = tryCatchWrapper(handlers[handlers.length - 1]);

    if (options?.secured) {
      // handlers = [authenticationMiddleware, ...handlers];
    }

    console.info(`${method.toUpperCase()}: ${this.parseEndPoint(path)}`);

    this.router[method](this.parseEndPoint(path), ...handlers);
  }

  protected get: Call = (path, ...handlers) => this.call('get', path, handlers);
  protected post: Call = (path, ...handlers) => this.call('post', path, handlers);
  protected put: Call = (path, ...handlers) => this.call('put', path, handlers);
  protected delete: Call = (path, ...handlers) => this.call('delete', path, handlers);
  protected patch: Call = (path, ...handlers) => this.call('patch', path, handlers);
}
