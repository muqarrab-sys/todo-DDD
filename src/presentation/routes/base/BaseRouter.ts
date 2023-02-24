import logger from '@/infra/utils/logger';
import authenticationMiddleware from '@/presentation/middleware/authentication.middleware';
import tryCatchWrapper from '@/presentation/middleware/tryCatch.wrapper';
import BaseController from '@presentation/controllers/base/BaseController';
import express, { IRouter, RequestHandler } from 'express';
import { isArray } from 'lodash';

export type RouterClass = { new (): BaseRouter<any> };
export type Methods = 'all' | 'get' | 'post' | 'put' | 'delete' | 'patch' | 'options' | 'head';
export type Call = (path: string, ...handlers: RequestHandler[]) => void;

export default abstract class BaseRouter<T = BaseController> {
  private baseRoute: string;
  protected router: IRouter = express.Router();
  private appliedMiddleware: RequestHandler[] = [];

  constructor(protected readonly controller: T, protected readonly path: string = '') {
    let baseName = this.constructor.name.replace('Router', '').toLowerCase();
    baseName = baseName === 'index' ? '' : baseName;
    this.baseRoute = path + (path ? `${baseName}` : baseName);

    // initiate routes that don't need authentication
    this.routes();

    // apply auth middleware before initializing protected routes
    this.appliedMiddleware.unshift(authenticationMiddleware());
    this.protectedRoutes();
  }

  protected abstract routes(): void;
  protected abstract protectedRoutes(): void;

  get module(): IRouter {
    return this.router;
  }

  protected get: Call = (path, ...handlers) => this.call('get', path, handlers);
  protected post: Call = (path, ...handlers) => this.call('post', path, handlers);
  protected put: Call = (path, ...handlers) => this.call('put', path, handlers);
  protected delete: Call = (path, ...handlers) => this.call('delete', path, handlers);
  protected patch: Call = (path, ...handlers) => this.call('patch', path, handlers);

  private parseEndPoint(path: string | Array<string>): string {
    const endPoint = [this.baseRoute]
      .concat(isArray(path) ? path : path.split('/'))
      .filter(part => part !== '')
      .join('/');

    return `/${endPoint}`;
  }

  private call(method: Methods, path: string, handlers: RequestHandler[]): void {
    handlers[handlers.length - 1] = tryCatchWrapper(handlers[handlers.length - 1]);

    handlers = this.appliedMiddleware.concat(handlers);

    logger.info(`${method.toUpperCase()}: ${this.parseEndPoint(path)}`);

    this.router[method](this.parseEndPoint(path), ...handlers);
  }
}
