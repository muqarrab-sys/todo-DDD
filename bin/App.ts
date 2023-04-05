import { Logger } from '@Infrastructure/IoC/Containers';
import BaseRouter from '@http/Routes/Base/BaseRouter';
import BaseApp from '@interfaces/BaseApp';
import { HttpStatusCode } from '@interfaces/HttpInterfaces';
import { IDatabaseClient } from '@interfaces/index';
import cors from 'cors';
import express, { NextFunction, Request, Response } from 'express';

class App extends BaseApp {
  private app: express.Application;

  constructor() {
    super();
    this.app = express();

    this.applyMiddleware();
  }

  public start() {
    if (!this.port) {
      throw new Error('Missing port!');
    }

    try {
      this.server = this.app.listen(this.port, () => {
        Logger.info(`Listing to http://localhost:${this.port}`);
      });
    } catch (error) {
      Logger.error("Couldn't start the server", error);
    }
  }

  public close() {
    if (!this.server) {
      throw new Error('No server initiated');
    }

    try {
      this.server.close();
      Logger.info('Server Closed!');
    } catch (error) {
      Logger.error("Couldn't close the server", error);
    }
  }

  async connectDatabase(database: IDatabaseClient) {
    await database.connect();
  }

  public initiateRoutes(routers: Array<BaseRouter>) {
    routers.forEach(router => {
      this.app.use('/api', router.getRoutes);
    });

    this.handleErrorResponse();
  }

  public setPort(port: number | string) {
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
      Logger.error(err);

      const code = err.httpCode || HttpStatusCode.INTERNAL_SERVER;

      res.status(code).json({ success: false, error: err.name, message: err.message });
    });
  }
}

export default App;
