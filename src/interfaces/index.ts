export { IDatabaseClient } from '@/infrastructure/database/interface/IDatabaseClient';
import { IUser } from '@/domain/entities/user/types';
import { NextFunction, Request, Response } from 'express';

export declare interface Req extends Request<any, any, any, any> {
  currentUser?: IUser;
}

export declare type IHandler = (req: Req, res: Response, next: NextFunction) => void;

export declare type IErrorHandler = (err: any, req: Request, res: Response, next: NextFunction) => void;

export declare const SortOrder: {
  asc: 'asc';
  desc: 'desc';
};

export type SortOrder = typeof SortOrder[keyof typeof SortOrder];
