import { NextFunction, Request, Response } from 'express';

export type ExMiddleware = (req: Request, res: Response, next: NextFunction) => any;

const tryMiddleware = (cb: ExMiddleware) => async (req: Request, res: Response, next: NextFunction) => {
  try {
    await cb(req, res, next);
  } catch (error) {
    next(error);
  }
};

export default tryMiddleware;
