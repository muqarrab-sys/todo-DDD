import { IHttpResponse } from '@interfaces/HttpInterfaces';
import { NextFunction, Request, Response, RequestHandler } from 'express';

export type HandlerCallback = (req: Request, res: Response, next: NextFunction) => Promise<IHttpResponse>;

const ResponseHandler =
  (cb: HandlerCallback): RequestHandler =>
  async (req, res, next) => {
    try {
      const httpResponse: IHttpResponse = await cb(req, res, next);

      res.status(httpResponse.status).json(httpResponse);
    } catch (error) {
      next(error);
    }
  };

export default ResponseHandler;
