import { readdirSync, statSync } from 'fs';
import { join } from 'path';

export default function indexBuilder<T = any>(dir: string, postfixes: Array<string>, skip: Array<string> = []) {
  const modules: T[] = [];

  function build(dir: string) {
    readdirSync(dir).forEach(file => {
      const filePath = join(dir, file);

      const pathIsFolder = statSync(filePath).isDirectory();
      const pathEndsWithPostfix = postfixes.some(postfix => file.endsWith(postfix));
      const isBlacklisted = skip.some(blacklistedPath => file.includes(blacklistedPath));

      if (pathIsFolder) {
        build(filePath);
      } else if (pathEndsWithPostfix && !isBlacklisted) {
        const Module = require(filePath).default;

        modules.push(Module);
      }
    });
  }
  build(dir);

  return modules;
}
