import BaseHttpException from '@/application/exceptions/base/BaseHttpException';
import { HttpStatusCode } from '@/application/exceptions/types';
import DatabasePort from '@/infra/persistence/database/database.port';
import cors from 'cors';
import express, { NextFunction, Response } from 'express';
import { Req } from './interfaces/express';
import BaseRouter from './routes/base/BaseRouter';
class App {
  private port: string | number;
  private app: express.Application;

  constructor() {
    this.port = process.env.PORT || 8080;
    this.app = express();

    this.applyMiddleware();
  }

  start() {
    this.app.listen(this.port, () => {
      console.log(`Listing to ${this.port}`);
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

  private handleErrorResponse() {
    this.app.use((err: any, _req: Req, res: Response, _next: NextFunction) => {
      if (err instanceof BaseHttpException) {
        res.status(err.httpCode).json({ success: false, error: err.name, message: err.message });
      } else {
        res.status(HttpStatusCode.INTERNAL_SERVER).json({ success: false, message: err.message });
      }
    });
  }
}

export default App;
