import { IUser } from '@interfaces/User';
import { NextFunction, Request, Response } from 'express';

export declare interface Req extends Request<any, any, any, any> {
  user?: IUser;
}

export declare type IHandler = (req: Req, res: Response, next: NextFunction) => void;

export declare type IErrorHandler = (err: any, req: Request, res: Response, next: NextFunction) => void;
