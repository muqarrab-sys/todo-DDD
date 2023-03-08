import { IHttpResponse } from '@interfaces/HttpInterfaces';
import { IHandler } from '@interfaces/index';
import { NextFunction, Request, Response } from 'express';

export type ExMiddleware = (req: Request, res: Response, next: NextFunction) => any;

const ResponseHandler =
  (cb: ExMiddleware): IHandler =>
  async (req, res, next) => {
    try {
      const httpResponse: IHttpResponse = await cb(req, res, next);

      res.status(httpResponse.status).json(httpResponse);
    } catch (error) {
      next(error);
    }
  };

export default ResponseHandler;
