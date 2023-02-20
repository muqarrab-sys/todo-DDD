import express, { NextFunction, Response } from 'express';
import DatabaseAdopter from '@/infra/database/database.adopter';
import { Req } from './interfaces/express';
import BaseRouter from './routes/BaseRouter';

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
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));
  }

  async connectDatabase(adopter: DatabaseAdopter) {
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
      console.error(err.stack);
      res.status(500).json({ error: err.message });
    });
  }
}

export default App;
