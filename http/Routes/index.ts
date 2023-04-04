import { readdirSync, statSync } from 'fs';
import { join } from 'path';
import BaseRouter from './Base/BaseRouter';

export default class Routes {
  static POSTFIXES = ['Router.ts', 'Router.js'];
  static SKIP = ['BaseRouter.ts', 'BaseRouter.js'];

  static build(dir: string = __dirname) {
    const routes: BaseRouter[] = [];

    readdirSync(dir).forEach(file => {
      const filePath = join(dir, file);

      const pathIsFolder = statSync(filePath).isDirectory();
      const pathEndsWithPostfix = Routes.POSTFIXES.some(postfix => file.endsWith(postfix));
      const isBlacklisted = Routes.SKIP.some(blacklistedPath => file.includes(blacklistedPath));

      if (pathIsFolder) {
        Routes.build(filePath);
      } else if (pathEndsWithPostfix && !isBlacklisted) {
        const Router = require(filePath).default;

        routes.push(new Router());
      }
    });

    return routes;
  }
}
