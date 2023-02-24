import BaseHttpException from '@/application/exceptions/base/BaseHttpException';
import { HttpStatusCode } from '@/application/exceptions/types';
import DatabasePort from '@/infra/persistence/database/database.port';
import logger from '@/infra/utils/logger';
import cors from 'cors';
import express, { NextFunction, Request, Response } from 'express';
import BaseRouter from './routes/base/BaseRouter';
class App {
  private port: string | number;
  private app: express.Application;

  constructor() {
    this.app = express();

    this.applyMiddleware();
  }

  start() {
    this.app.listen(this.port, () => {
      logger.info(`Listing to ${this.port}`);
    });
  }

  applyMiddleware() {
    this.app.use(
      cors({
        origin: '*',
        credentials: true,
      }),
    );
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));
  }

  async connectDatabase(adopter: DatabasePort) {
    await adopter.connect();
  }

  initiateRoutes(routers: Array<BaseRouter>) {
    routers.forEach(router => {
      this.app.use('/api/', router.module);
    });

    this.handleErrorResponse();
  }

  setPort(port: number | string) {
    this.port = port;
  }

  private handleErrorResponse() {
    this.app.use((err: any, _req: Request, res: Response, _next: NextFunction) => {
      logger.error(err);
      if (err instanceof BaseHttpException) {
        res.status(err.httpCode).json({ success: false, error: err.name, message: err.message });
      } else {
        res.status(HttpStatusCode.INTERNAL_SERVER).json({ success: false, message: err.message });
      }
    });
  }
}

export default App;
