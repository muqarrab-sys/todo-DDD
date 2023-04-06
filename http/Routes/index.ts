import indexBuilder from '@Infrastructure/Utils/IndexBuilder';
import BaseRouter from './Base/BaseRouter';

const POSTFIXES = ['Router.ts', 'Router.js'];
const SKIP = ['BaseRouter.ts', 'BaseRouter.js'];

export default indexBuilder<{ new (): BaseRouter }>(__dirname, POSTFIXES, SKIP);
