import BaseRouter from '@http/Routes/Base/BaseRouter';
import logger from '@Infrastructure/Utils/logger';
import { HttpStatusCode } from '@interfaces/HttpInterfaces';
import { IDatabaseClient } from '@interfaces/index';
import cors from 'cors';
import express, { NextFunction, Request, Response } from 'express';

class App {
  private port: string | number;
  private app: express.Application;

  constructor() {
    this.app = express();

    this.applyMiddleware();
  }

  start() {
    if (!this.port) {
      throw new Error('Missing port!');
    }

    this.app.listen(this.port, () => {
      logger.info(`Listing to http://localhost:${this.port}`);
    });
  }

  async connectDatabase(dbClient: IDatabaseClient) {
    await dbClient.connect();
  }

  initiateRoutes(routers: Array<BaseRouter>) {
    routers.forEach(router => {
      this.app.use('/api', router.getRoutes);
    });

    this.handleErrorResponse();
  }

  setPort(port: number | string) {
    this.port = port;
  }

  private applyMiddleware() {
    this.app.use(
      cors({
        origin: '*',
        credentials: true,
      }),
    );
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));
  }

  private handleErrorResponse() {
    this.app.use((err: any, _req: Request, res: Response, _next: NextFunction) => {
      logger.error(err);

      const code = err.httpCode || err.code || HttpStatusCode.INTERNAL_SERVER;

      res.status(code).json({ success: false, error: err.name, message: err.message });
    });
  }
}

export default App;
