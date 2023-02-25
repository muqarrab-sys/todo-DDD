import BaseController from '@/application/controllers/base/BaseController';
import logger from '@/infrastructure/utils/logger';
import { RequestHandler, Router } from 'express';
import authorize from '../../middleware/authMiddleware';
import tryMiddleware from '../../middleware/tryMiddleware';

type Methods = 'all' | 'get' | 'post' | 'put' | 'delete' | 'patch' | 'options' | 'head';
type Call = (path: string, ...handlers: RequestHandler[]) => void;

abstract class BaseRouter<T = BaseController> {
  private router: Router;
  protected controller: T;
  private appliedMiddleware: RequestHandler[] = [];

  constructor(Controller: { new (): T }) {
    this.router = Router();
    this.controller = new Controller();

    this.routes();

    this.appliedMiddleware = [authorize()];
    this.protectedRoutes();
  }

  protected abstract routes(): void;
  protected abstract protectedRoutes(): void;

  get getRoutes(): Router {
    return this.router;
  }

  protected get: Call = (path, ...handlers) => this.call('get', path, handlers);
  protected post: Call = (path, ...handlers) => this.call('post', path, handlers);
  protected put: Call = (path, ...handlers) => this.call('put', path, handlers);
  protected delete: Call = (path, ...handlers) => this.call('delete', path, handlers);
  protected patch: Call = (path, ...handlers) => this.call('patch', path, handlers);

  private call(method: Methods, path: string, handlers: RequestHandler[]): void {
    handlers[handlers.length - 1] = tryMiddleware(handlers[handlers.length - 1]);

    handlers = this.appliedMiddleware.concat(handlers);

    logger.info(`${method.toUpperCase()}: ${path}`);

    this.router[method](path, ...handlers);
  }
}

export default BaseRouter;
