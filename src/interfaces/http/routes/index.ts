import { readdirSync, statSync } from 'fs';
import { join } from 'path';
import BaseRouter from './base/BaseRouter';

export default class Routes {
  static POSTFIXES = ['Router.ts', 'Router.js'];

  static build(dir: string = __dirname) {
    const routes: BaseRouter[] = [];

    readdirSync(dir).forEach(file => {
      const filePath = join(dir, file);

      if (!statSync(filePath).isDirectory() && Routes.POSTFIXES.some(postfix => file.endsWith(postfix))) {
        const Router = require(filePath).default;

        routes.push(new Router());
      }
    });

    return routes;
  }
}
