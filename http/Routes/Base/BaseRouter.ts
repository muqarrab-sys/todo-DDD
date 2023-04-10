import { Logger } from '@Infrastructure/IoC/Containers';
import JwtAuth from '@http/Middleware/JwtAuth';
import ResponseHandler, { HandlerCallback } from '@http/Middleware/ResponseHandler';
import { RequestHandler, Router } from 'express';

type Methods = 'all' | 'get' | 'post' | 'put' | 'delete' | 'patch' | 'options' | 'head';
type Call = (path: string, ...handlers: RequestHandler[]) => void;

abstract class BaseRouter<T = any> {
  private router: Router;
  protected controller: T;
  private appliedMiddleware: RequestHandler[] = [];

  constructor(Controller: { new (): T }) {
    this.router = Router();
    this.controller = new Controller();

    this.routes();

    this.appliedMiddleware = [JwtAuth()];
    this.protectedRoutes();
  }

  protected routes(): void {}
  protected protectedRoutes(): void {}

  get getRoutes(): Router {
    return this.router;
  }

  protected get: Call = (path, ...handlers) => this.call('get', path, handlers);
  protected post: Call = (path, ...handlers) => this.call('post', path, handlers);
  protected put: Call = (path, ...handlers) => this.call('put', path, handlers);
  protected delete: Call = (path, ...handlers) => this.call('delete', path, handlers);
  protected patch: Call = (path, ...handlers) => this.call('patch', path, handlers);

  private call(method: Methods, path: string, handlers: RequestHandler[]): void {
    handlers[handlers.length - 1] = ResponseHandler(handlers[handlers.length - 1] as HandlerCallback);

    handlers = this.appliedMiddleware.concat(handlers);

    Logger.info(`${method.toUpperCase()}: ${path}`);

    this.router[method](path, ...handlers);
  }
}

export default BaseRouter;
