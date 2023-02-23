import { readdirSync, statSync } from 'fs';
import { join } from 'path';
import BaseRouter from './base/BaseRouter';

export default class RoutesAdopter {
  private POSTFIXES = ['.router.ts', '.router.js'];
  private modulesArray: Array<BaseRouter> = [];

  constructor() {
    this.build(__dirname);
  }

  get modules(): Array<BaseRouter> {
    return this.modulesArray;
  }

  private build(dir: string) {
    readdirSync(dir).forEach(file => {
      const filePath = join(dir, file);

      if (statSync(filePath).isDirectory()) {
        this.build(filePath);
      } else if (this.POSTFIXES.some(postfix => file.endsWith(postfix))) {
        const Router = require(filePath).default;

        let route: string | Array<string> = filePath.replace(dir, '').split('/');
        route = route.slice(1, route.length - 1).join('/');

        this.modulesArray.push(new Router(route));
      }
    });
  }
}
