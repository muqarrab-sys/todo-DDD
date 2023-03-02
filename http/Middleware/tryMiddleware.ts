import { IHandler } from '@interfaces/index';
import { NextFunction, Request, Response } from 'express';

export type ExMiddleware = (req: Request, res: Response, next: NextFunction) => any;

const tryMiddleware =
  (cb: ExMiddleware): IHandler =>
  async (req, res, next) => {
    try {
      await cb(req, res, next);
    } catch (error) {
      next(error);
    }
  };

export default tryMiddleware;
