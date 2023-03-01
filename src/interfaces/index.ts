export { IDatabaseClient } from '@/infrastructure/database/interface/IDatabaseClient';
import { IUser } from '@/domain/entities/user/types';
import { NextFunction, Request, Response } from 'express';

export declare interface Req extends Request<any, any, any, any> {
  user?: IUser;
}

export declare type IHandler = (req: Req, res: Response, next: NextFunction) => void;

export declare type IErrorHandler = (err: any, req: Request, res: Response, next: NextFunction) => void;

export declare const SortOrder: {
  asc: 'asc';
  desc: 'desc';
};

export type SortOrder = typeof SortOrder[keyof typeof SortOrder];

export declare type PartialBy<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>;

export type IdObject = {
  id: number;
};

export interface ISearchQuery<T> {
  page?: number;
  limit?: number;
  orderBy?: keyof T;
  sortBy?: SortOrder;
}

export type IOrderBy<T> = {
  [key in keyof T]: SortOrder;
};
